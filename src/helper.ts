import * as vscode from 'vscode'
import path from 'path'

export async function showCreateNameInputBox(): Promise<string | undefined> {
  return vscode.window.showInputBox({
    // placeHolder: 'Please enter the name of the new file',
    prompt: 'Enter the name of the new class',
    value: 'NewClass'
  })
}

export async function createClass(name: string, root: string) {
  console.log(name, root)

  if (!(await isDir(root))) {
    root = path.dirname(root)
  }

  const head = `#pragma once

class ${name} {
};

`
  const t1 = vscode.workspace.fs.writeFile(
    vscode.Uri.file(path.join(root, `${name}.h`)),
    Buffer.from(head)
  )

  const content = `#include "${name}.h" 

`

  const t2 = vscode.workspace.fs.writeFile(
    vscode.Uri.file(path.join(root, `${name}.cpp`)),
    Buffer.from(content)
  )
}

export async function isDir(root: string) {
  const stat = await vscode.workspace.fs.stat(vscode.Uri.file(root))
  return stat.type === vscode.FileType.Directory
}
