import { EditorView } from "@codemirror/view";
//import { FlowEditorParent } from "adapters/obsidian/ui/editors/FlowEditor";


//copy from makemd
//https://github.com/Make-md/makemd/blob/1560cf1d522eebabd5a8b36a943f296ece1069df/src/adapters/obsidian/types/obsidian.d.ts#L4
declare module "obsidian" {
  interface App {
    appId: string;
    dragManager: any;
    commands: {
      listCommands(): Command[];
      findCommand(id: string): Command;
      removeCommand(id: string): void;
      executeCommandById(id: string): void;
      commands: Record<string, Command>;
    };
    embedRegistry: {
      embedByExtension: Record<string, any>;
    };
    mobileToolbar: {
      containerEl: HTMLElement;
    };
    hotkeyManager: {
      getHotkeys(id: string): Hotkey[];
      getDefaultHotkeys(id: string): Hotkey[];
    };
    internalPlugins: {
      getPluginById(id: string): { instance: { options: { pinned: [] } } };
    };
  }
  interface Vault {
	checkPath(path: string): null;
	getConfig(option: "useMarkdownLinks"): boolean;
  }

  interface FileManager {
    processFrontMatter: (
      file: TFile,
      callback: (FrontMatterCache: any) => void,
      option?: DataWriteOptions
    ) => Promise<void>;
	createNewMarkdownFile: (folder: TFolder, name: string) => Promise<TFile>;
	/**
	 * 
	 * @param fn 
	 * @returns 
	 */
	iterateAllRefs: (fn: (fileName: string, cache: LinkCache) => void) => void
	updateInternalLinks: (changes: Changes) => void
	linkUpdaters: {
		canvas: {
			canvas: {
				index: {
					getAll: () => Record<string, { caches: Record<string, any>[], embeds: { file?: string, subpath?: string }[] }>
				}			
			}
			//subpath behind #
			renameSubpath: (file: TFile, oldSubpath: string, newSubpath: string) => any
		}
	}
  }

  interface MetadataCache {
    getCachedFiles(): string[];
    getTags(): Record<string, number>;
  }

  // class FileExplorerPlugin extends Plugin_2 {
  //   revealInFolder(this: any, ...args: any[]): any;
  // }

  interface WorkspaceParent {
    insertChild(index: number, child: WorkspaceItem, resize?: boolean): void;
    replaceChild(index: number, child: WorkspaceItem, resize?: boolean): void;
    removeChild(leaf: WorkspaceLeaf, resize?: boolean): void;
    containerEl: HTMLElement;
  }

  interface EmptyView extends View {
    actionListEl: HTMLElement;
    emptyTitleEl: HTMLElement;
  }

  interface MousePos {
    x: number;
    y: number;
  }

  interface EphemeralState {
    focus?: boolean;
    subpath?: string;
    line?: number;
    startLoc?: Loc;
    endLoc?: Loc;
    scroll?: number;
  }
  interface WorkspaceMobileDrawer {
    currentTab: number;
    children: WorkspaceLeaf[];
  }

  interface HoverPopover {
    //parent: FlowEditorParent | null;
    targetEl: HTMLElement;
    hoverEl: HTMLElement;
    hide(): void;
    show(): void;
    shouldShowSelf(): boolean;
    timer: number;
    waitTime: number;
    shouldShow(): boolean;
    transition(): void;
  }
  interface MarkdownFileInfo {
    contentEl: HTMLElement;
  }
  interface Workspace {
    activeEditor: MarkdownFileInfo | null;
    recordHistory(leaf: WorkspaceLeaf, pushHistory: boolean): void;
    iterateLeaves(
      callback: (item: WorkspaceLeaf) => boolean | void,
      item: WorkspaceItem | WorkspaceItem[]
    ): boolean;
    iterateLeaves(
      item: WorkspaceItem | WorkspaceItem[],
      callback: (item: WorkspaceLeaf) => boolean | void
    ): boolean;
	getDropLocation(event: MouseEvent): {
		children: {
			tabHeaderEl:HTMLElement,
			view:TextFileView
		}[],
      target: WorkspaceItem;
      sidedock: boolean;
    };
    recursiveGetTarget(
      event: MouseEvent,
      parent: WorkspaceParent
    ): WorkspaceItem;
    recordMostRecentOpenedFile(file: TFile): void;
    onDragLeaf(event: MouseEvent, leaf: WorkspaceLeaf): void;
    onLayoutChange(): void; // tell Obsidian leaves have been added/removed/etc.
    floatingSplit: WorkspaceSplit;
  }
  interface WorkspaceSplit {
	  children: SplitItem[];
  }
  interface WorkspaceLeaf {
    containerEl: HTMLElement;
    tabHeaderInnerTitleEl: HTMLElement;
    tabHeaderInnerIconEl: HTMLElement;
  }
  interface Editor {
    cm: EditorView;
  }

  // interface View {
  //   headerEl: HTMLDivElement;
  //   editor?: Editor,
  //   setMode?: (arg0: unknown) => unknown,
  //   editMode?: unknown,
  //   file?: TAbstractFile,
  // }
  interface MenuItem {
    dom: HTMLElement;
    iconEl: HTMLElement
  }
  interface Menu {
    dom: HTMLElement;
    scope: Scope;
  }
  interface Scope {
    keys: KeymapEventHandler[];
  }
  interface EditorSuggest<T> {
    suggestEl: HTMLElement;
	}
	interface SplitItem {
		id: string,
		containerEl: HTMLElement,
		doc?: Document,

	}
	interface SectionCache {
		type: 'heading' | 'list' | 'paragraph' | 'blockquote' | string;
	}

	interface ChangeInfo {
		/**
		 * new link text set to editor
		 */
		change: string,
		/**
		 * old link info
		 */
		reference: LinkCache,
		/**
		 * file contains this link
		 */
		sourcePath: string,
	}
	interface Changes {
		data: Record<string, ChangeInfo[]>
		add: (key: string, value: ChangeInfo) => void,
		remove: (key: string, value: ChangeInfo) => void,
		removeKey: (key: string) => void,
		get: (key: string) => ChangeInfo[],
		keys: () => string[],
		clear: (key: string) => void,
		clearAll: () => void,
		contains: (key: string, value: ChangeInfo) => boolean,
		count: () => number,
	}
}
