import { writeFile } from "fs-extra";
import { readFile } from "fs/promises";
import { join } from "path";

export async function replace(source: string, target: string) {
    const indexTypesPath = join(process.cwd(), "@types", "index.d.ts");
    const indexTypesContent = await readFile(indexTypesPath, "utf8");
    const indexTypesToLib = indexTypesContent.split(source).join(target);
    await writeFile(indexTypesPath, indexTypesToLib);
}
// © 2022 SAP SE or an SAP affiliate company. All rights reserved.


