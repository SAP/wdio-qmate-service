import fs from "node:fs/promises";
import path from "node:path";
import { glob } from "glob";

const manifest = require("../../package.json");

async function generateTypes(): Promise<void> {
  const root = process.cwd();
  const destination = path.join(root, "typesTmp");
  const modules = path.join(root, "lib/reuse/modules");
  // This fixed directory is generated output, never a source checkout.
  await fs.rm(destination, { recursive: true, force: true });
  await fs.mkdir(destination, { recursive: true });
  const owner = manifest.name;
  const header = 'import "' + owner + '";\n';
  await fs.writeFile(path.join(destination, "index.d.ts"), 'import QmateService = require("' + owner + '");\nexport = QmateService;\n');
  await fs.writeFile(path.join(destination, "wdio.d.ts"), header + 'export type { Element } from "' + owner + '/@types/wdio";\n');
  await fs.writeFile(path.join(destination, "locatorTypes.d.ts"), header + 'export type * from "' + owner + '/@types/locatorTypes";\n');

  // Keep existing deep module paths, but share the runtime's type identities.
  // Copying classes would duplicate globals and drift from optional WDIO types.
  for (const file of await glob("**/*.d.ts", { cwd: modules, nodir: true })) {
    const relative = file.split(path.sep).join("/");
    const target = path.join(destination, "modules", file);
    const specifier = owner + "/lib/reuse/modules/" + relative.replace(/\.d\.ts$/, "");
    const source = await fs.readFile(path.join(modules, file), "utf8");
    let content = header + 'export type * from "' + specifier + '";\n';
    if (/^export default /m.test(source)) content += 'export type { default } from "' + specifier + '";\n';
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content);
  }
  await fs.writeFile(
    path.join(destination, "package.json"),
    JSON.stringify(
      {
        name: "@types/wdio-qmate-service",
        version: manifest.version,
        description: "Compatibility type entry points for the packaged Qmate service",
        types: "index.d.ts",
        files: ["index.d.ts", "wdio.d.ts", "locatorTypes.d.ts", "modules"],
        dependencies: { [owner]: "^" + manifest.version }
      },
      null,
      2
    ) + "\n"
  );
}

generateTypes().catch((error: unknown) => {
  process.stderr.write(String(error) + "\n");
  process.exitCode = 1;
});
