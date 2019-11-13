import {EditorState} from "@codemirror/next/state"
import {EditorView} from "@codemirror/next/view"
import {keymap} from "@codemirror/next/keymap"
import {history, redo, redoSelection, undo, undoSelection} from "@codemirror/next/history"
import {foldCode, unfoldCode, codeFolding, foldGutter} from "@codemirror/next/fold"
import {lineNumbers} from "@codemirror/next/gutter"
import {baseKeymap, indentSelection} from "@codemirror/next/commands"
import {bracketMatching} from "@codemirror/next/matchbrackets"
import {closeBrackets} from "@codemirror/next/closebrackets"
import {specialChars} from "@codemirror/next/special-chars"
import {multipleSelections} from "@codemirror/next/multiple-selections"
import {search, defaultSearchKeymap} from "@codemirror/next/search"
import {javascript} from "@codemirror/next/lang-javascript"
import {defaultHighlighter} from "@codemirror/next/highlight"


let state = EditorState.create({doc: `
const arrfunc = () => {
  console.log("Just a test of syntax");
  console.warn("Not ready for production");
}
`, extensions: [
  lineNumbers(),
  history(),
  specialChars(),
  foldGutter(),
  multipleSelections(),
  javascript(),
  search({keymap: defaultSearchKeymap}),
  defaultHighlighter,
  bracketMatching(),
  closeBrackets(),
  keymap({
    "Mod-z": undo,
    "Mod-Shift-z": redo,
    "Mod-u": view => undoSelection(view) || true,
    "Alt-u": redoSelection,
    "Ctrl-y": redo,
    "Shift-Tab": indentSelection,
    "Mod-Alt-[": foldCode,
    "Mod-Alt-]": unfoldCode
  }),
  keymap(baseKeymap),
]})

let view = (window).view = new EditorView({state})
document.body.append(view.dom)
