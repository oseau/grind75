const action = ((start = 0) => {
  const length = 75;
  let idx = start;
  const getAllLink = () => document.querySelectorAll("a.text-indigo-600")
  if (getAllLink().length != length) {
    [...document.querySelectorAll("button[aria-label*=' Week ']")].map((b) => b.click());
  }
  const select = () => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(getAllLink()[idx % length]);
    selection.removeAllRanges();
    selection.addRange(range);
    getAllLink()[idx % length].scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };
  const open = () => {
    window.open(getAllLink()[idx % length].href.replace("leetcode.com/", "leetcode.cn/"), "_blank").focus();
    next()
  };
  const prev = () => {
    idx--;
    select()
  }
  const next = () => {
    idx++;
    select()
  }
  select()
  return {
    next,
    prev,
    open,
  };
})();

const onKeyboard = () => {
  document.addEventListener('keydown', (event) => {
    if (event.key === "j") {
      action.next()
    } else if (event.key === "k") {
      action.prev()
    } else if (event.key === "o") {
      action.open()
    }
  });
}

(() => {
  onKeyboard()
})()
