
function describeFunction(f) {
  if (typeof f !== "function") {
    throw new TypeError("describeFunction(f) 'f' arg must be a function of some sort");
  }

  const flags = {};

  const hasProto = Object.prototype.hasOwnProperty.call(f, "prototype");
  const ostr = Object.prototype.toString.call(f).slice(8, -1).toLowerCase();
  const fstr = Function.prototype.toString.call(f).replace(/\n+/g, "").replace(/\s+/g, "");

  flags.isNative = /\{\[nativecode\]/.test(fstr);
  flags.isBound = f.name.startsWith("bound ") && flags.isNative;
  flags.isAsync = fstr.startsWith("async") && ostr.startsWith("async");
  flags.isGenerator = fstr.includes("function*") && ostr.includes("generator");

  flags.name = (flags.isBound ? f.name.replace("bound ", "") : (f.name || "anonymous"));

  let p = flags.isAsync ? fstr.replace("async", "") : fstr;

  if (p.startsWith("function")) {
    p = p.replace("function" + (flags.isGenerator ? "*" : ""), "").split("{")[0];
    if (!p.startsWith("(")) {
      let name = p.slice(0, p.indexOf("("));
      p = p.replace(name, "");
    }

    p = p.slice(1, p.lastIndexOf(")"));
    flags.type = "function";
  } else if (p.startsWith("class")) {
    if (/constructor\(/.test(p)) {
      p = p.split(/constructor\(/)[1];
      p = p.slice(0, p.indexOf(")");
    } else {
      p = "";
    }
    flags.type = "class";
  } else if (p.indexOf("=>") !== -1 && !hasProto) {
    p = p.split("=>")[0];
    if (p.startsWith("(")) {
      p = p.slice(1, p.indexOf(")"));
    }
    flags.type = "arrow";
  } else if (/^get|set/.test(p)) {
    p = p.slice(p.indexOf("(") + 1, p.indexOf(")"));
    flags.type = (fstr.match(/^get|set/)[0]) + "ter";
    flags.name = flags.name.replace(/^get|set/, "").trim();
  } else {
    p = "";
  }

  flags.params = p === "" ? [] : p.split(",");
  flags.isBindable = hasProto && flags.type !== "arrow";

  return flags;
}
