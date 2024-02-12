export type tContentType = "header" | "text" | "image" | "video" | "container";
import { stringify } from "../../utils/misc.ts";

export interface IRCData {
  value?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  textAlign?: string;
  size?: {
    width: number;
    height: number;
  };
}

export interface IRC {
  type: tContentType;
  data: IRCData;
  items?: IRC[];
}

export const defaultValue = {
  type: "container" as tContentType,
  data: {
    flexDirection: "column",
  },
};

export const defaultImage = {
  value:
    "https://cdn3.iconfinder.com/data/icons/online-states/150/Photos-512.png",
  size: {
    width: 360,
    height: 360,
  },
};

export const defaultVideo = {
  value:
    "https://external-preview.redd.it/JP-CYfhVX3e_n_ilieCSrG4Wdy4Pnn8El5Rxk4DomeM.jpg?width=640&crop=smart&auto=webp&s=695b4a3cd0bcd026a92ed70441f3f2f3aa6cb567",
  size: {
    width: 640,
    height: 360,
  },
};

interface RCProps {
  item: IRC;
  parent?: RC;
  index?: number;
}

export class RC {
  type: tContentType;
  items?: IRC[];
  data: IRCData;
  private _richItems?: RC[];
  private _parent?: RC;
  private _index?: number;
  constructor({ item, parent, index }: RCProps) {
    this.type = item.type;
    this.items = item.items;
    this.data = item.data;
    this._richItems = [];
    this._parent = parent;
    this._index = index;
  }
  get richItems(): RC[] {
    if (this.items && this.items.length) {
      this._richItems = this.items.map((item, index) => {
        return new RC({ item, parent: this, index });
      });
    } else {
      this._richItems = [];
    }

    return this._richItems;
  }
  same(item: RC | IRC): boolean {
    if("richItems" in item) return stringify(this) === stringify(item);
    return false
  }
  getRoot(): RC {
    if (!this._parent) return this;

    return this._parent.getRoot();
  }
  buildData(): IRC {
    return {
      data: this.data,
      type: this.type,
      items: this.richItems.map((item) => item.buildData()),
    };
  }
  destroy(): IRC {
    if (this._parent && this._index !== undefined) {
      this._parent.items?.splice(this._index, 1);
      return this.getRoot().buildData();
    } else {
      return defaultValue;
    }
  }
  include(parent: RC): boolean {
    if (this.same(parent)) return true;
    if (!this._parent) return false;

    return this._parent.include(parent);
  }
}
