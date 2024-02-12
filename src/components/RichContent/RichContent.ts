export type tContentType = "header" | "text" | "image" | "video" | "container";
import { stringify } from "../../utils/misc.ts";

interface IRCData {
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
    width: 150,
    height: 150,
  },
};
export const defaultVideo = {
  value:
    "data:image/png;base64,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",
  size: {
    width: 150,
    height: 150,
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
