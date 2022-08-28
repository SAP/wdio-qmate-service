import fs from "fs/promises";
import fse from "fs-extra";
import path from "path";
import glob from "glob-promise";

const pj = require("../../package.json");

class TypesGenerator {
  private DIST_FOLDER_PATH = process.cwd();
  private DIST_FOLDER_NAME = "typesTmp";

  private SRC_MODULES_FOLDER_PATH = `${process.cwd()}/lib/reuse`;
  private SRC_MODULES_FOLDER_NAME = "modules";

  private SRC_INDEX_FOLDER_PATH = process.cwd();
  private SRC_INDEX_FOLDER_NAME = "@types";

  private PACKAGE_JSON_BASE_CONTENT = {
    name: "@types/wdio-qmate-service",
    version: "1.0.0",
    description: "Packaged types for wdio-qmate-service",
    author: "C5329190",
    maintainers: [
      {
        name: "Marvin Grüssinger",
        email: "marvin.gruessinger@sap.com",
      },
      {
        name: "Benjamin Warth",
        email: "benjamin.warth@sap.com",
      },
    ],
    dependencies: {
      "@types/axios": "^0.14.0",
      "@types/node": "^18.0.3",
    },
  };

  public async generateTypes() {
    const srcModulesPath = path.join(this.SRC_MODULES_FOLDER_PATH, this.SRC_MODULES_FOLDER_NAME);
    const srcIndexPath = path.join(this.SRC_INDEX_FOLDER_PATH, this.SRC_INDEX_FOLDER_NAME);
    const distPath = path.join(this.DIST_FOLDER_PATH, this.DIST_FOLDER_NAME);

    await this.prepareTmpFolder(distPath);

    await this.copyModulesTypes(srcModulesPath, distPath);
    await this.copyIndexTypes(srcIndexPath, distPath);
    await this.writePackageJson(distPath);
  }

  private async writePackageJson(distPath: string) {
    const updatedPackageJson = Object.assign({}, this.PACKAGE_JSON_BASE_CONTENT);
    updatedPackageJson.version = pj.version;
    await fs.writeFile(`${distPath}/package.json`, JSON.stringify(updatedPackageJson, null, 2));
  }

  private async copyIndexTypes(srcPath: string, distPath: string) {
    const content = await this.getFolderContent(srcPath, ".d.ts");
    const contentLean = await this.replaceBasePath(content, `${srcPath}/`);
    await this.writeIndex(contentLean, srcPath, distPath);
  }

  private async copyModulesTypes(srcPath: string, distPath: string) {
    const content = await this.getFolderContent(srcPath, ".d.ts");
    const contentLean = await this.replaceBasePath(content, `${srcPath}/`);
    const contentSplitted = await this.splitToModules(contentLean);
    await this.writeModules(contentSplitted, distPath, srcPath);
  }

  private async writeIndex(files: string[], srcPath: string, distPath: string) {
    const replacements = [
      {
        src: 'from "../src/reuse/modules',
        replace: 'from "./modules',
      },
    ];
    for (const file of files) {
      const src = `${srcPath}/${file}`;
      const dist = `${distPath}/${file}`;
      await fse.copy(src, dist, {
        recursive: true,
      });
      await this.replaceStringsInFile(dist, replacements);
    }
  }

  private async prepareTmpFolder(path: string) {
    await fs.rm(path, { recursive: true, force: true });
    await fs.mkdir(path);
  }

  private async getFolderContent(folderPath: string, ext?: string): Promise<string[]> {
    return glob(`${folderPath}/**/*${ext ? ext : ""}`);
  }

  private async replaceBasePath(content: string[], srcPath: string): Promise<string[]> {
    return content.map((c) => c.replace(srcPath, ""));
  }

  private async splitToModules(content: string[]) {
    return content.reduce((acc, cur) => {
      const slashIndex = cur.indexOf("/");
      const moduleName = cur.slice(0, slashIndex);
      const file = cur.slice(slashIndex + 1);
      if (Array.isArray(acc[moduleName])) {
        acc[moduleName].push(file);
      } else {
        acc[moduleName] = [file];
      }
      return acc;
    }, {} as { [key: string]: string[] });
  }

  private async writeModules(content: { [key: string]: string[] }, distPath: string, srcPath: string) {
    for (const moduleName in content) {
      await this.writeSingleModule(moduleName, content[moduleName], distPath, srcPath);
    }
  }

  private async writeSingleModule(moduleName: string, files: string[], distPath: string, srcPath: string) {
    const replacements = [
      {
        src: 'import { Element } from "../../../../@types/wdio"',
        replace: 'import { Element } from "../../../@types/wdio"',
      },
    ];
    for (const file of files) {
      const src = `${srcPath}/${moduleName}/${file}`;
      const dist = `${distPath}/modules/${moduleName}/${file}`;
      await fse.copy(src, dist, {
        recursive: true,
      });
      await this.replaceStringsInFile(dist, replacements);
    }
  }

  private async replaceStringsInFile(filePath: string, replacements: { src: string; replace: string }[]) {
    let fileContent = await fs.readFile(filePath, { encoding: "utf-8" });
    for (const replacement of replacements) {
      if (fileContent.includes(replacement.src)) {
        fileContent = fileContent.split(replacement.src).join(replacement.replace);
      }
    }
    await fs.writeFile(filePath, fileContent);
  }
}

new TypesGenerator().generateTypes();
