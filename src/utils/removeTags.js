export function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    const hasclosingTag = str.replace(/(<([^>]+)>)/gi, "").includes("</");
    if (hasclosingTag) {
      return str.replace(/(<([^>]+)>)/gi, "").slice(0, -7);
    } else return str.replace(/(<([^>]+)>)/gi, "");
  }
