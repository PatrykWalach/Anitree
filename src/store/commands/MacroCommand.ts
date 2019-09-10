import { Command } from '../commands'

export const areUndoable = (
  commands: Command[],
): commands is Required<Command>[] => commands.every(e => e.undo)

export class MacroCommand implements Command {
  public commands: Set<Command>

  constructor(commands: Command[]) {
    this.commands = new Set(commands)
  }

  public undo() {
    const commands = [...this.commands].reverse()
    if (areUndoable(commands)) {
      for (const command of commands) {
        command.undo()
      }
    }
  }

  public execute() {
    for (const command of this.commands) {
      command.execute()
    }
  }
}
