// @ts-ignore
import * as graphvizlib from "../build/graphviz/graphvizlib/graphvizlib";
import { loadWasm } from "./util";

type Format = "svg" | "dot" | "json" | "dot_json" | "xdot_json";
type Engine = "circo" | "dot" | "fdp" | "neato" | "osage" | "patchwork" | "twopi";

export const graphviz = {
    layout(dotSource: string, outputFormat: Format = "svg", layoutEngine: Engine = "dot"): Promise<string> {
        if (!dotSource) return Promise.resolve("");
        return loadWasm(graphvizlib).then(wasm => {
            const retVal = wasm.Main.prototype.layout(dotSource, outputFormat, layoutEngine);
            if (!retVal) {
                throw new Error(wasm.Main.prototype.lastError());
            }
            return retVal;
        });
    },
    circo(dotSource: string, outputFormat: Format = "svg"): Promise<string> {
        return this.layout(dotSource, outputFormat, "circo");
    },
    dot(dotSource: string, outputFormat: Format = "svg"): Promise<string> {
        return this.layout(dotSource, outputFormat, "dot");
    },
    fdp(dotSource: string, outputFormat: Format = "svg"): Promise<string> {
        return this.layout(dotSource, outputFormat, "fdp");
    },
    neato(dotSource: string, outputFormat: Format = "svg"): Promise<string> {
        return this.layout(dotSource, outputFormat, "neato");
    },
    osage(dotSource: string, outputFormat: Format = "svg"): Promise<string> {
        return this.layout(dotSource, outputFormat, "osage");
    },
    patchwork(dotSource: string, outputFormat: Format = "svg"): Promise<string> {
        return this.layout(dotSource, outputFormat, "patchwork");
    },
    twopi(dotSource: string, outputFormat: Format = "svg"): Promise<string> {
        return this.layout(dotSource, outputFormat, "twopi");
    }
};

class GraphvizSync {

    constructor(private _wasm: any) {
    }

    layout(dotSource: string, outputFormat: Format = "svg", layoutEngine: Engine = "dot"): string {
        if (!dotSource) return "";
        const retVal = this._wasm.Main.prototype.layout(dotSource, outputFormat, layoutEngine);
        if (!retVal) {
            throw new Error(this._wasm.Main.prototype.lastError());
        }
        return retVal;
    }

    circo(dotSource: string, outputFormat: Format = "svg"): string {
        return this.layout(dotSource, outputFormat, "circo");
    }

    dot(dotSource: string, outputFormat: Format = "svg"): string {
        return this.layout(dotSource, outputFormat, "dot");
    }

    fdp(dotSource: string, outputFormat: Format = "svg"): string {
        return this.layout(dotSource, outputFormat, "fdp");
    }

    neato(dotSource: string, outputFormat: Format = "svg"): string {
        return this.layout(dotSource, outputFormat, "neato");
    }

    osage(dotSource: string, outputFormat: Format = "svg"): string {
        return this.layout(dotSource, outputFormat, "osage");
    }

    patchwork(dotSource: string, outputFormat: Format = "svg"): string {
        return this.layout(dotSource, outputFormat, "patchwork");
    }

    twopi(dotSource: string, outputFormat: Format = "svg"): string {
        return this.layout(dotSource, outputFormat, "twopi");
    }
}

export function graphvizSync(): Promise<GraphvizSync> {
    return loadWasm(graphvizlib).then(wasm => new GraphvizSync(wasm));
}
