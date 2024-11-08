const $$ = document.querySelectorAll.bind(document);

const getStorage = async (key) =>
  new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(key, (value) => resolve(value[key]));
    } catch (ex) {
      reject(ex);
    }
  });

const setStorage = async (obj) =>
  new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set(obj, () => resolve());
    } catch (ex) {
      reject(ex);
    }
  });

const action = async () => {
  const length = parseInt(
    /\/.*?(\d+)/.exec(
      [...$$("h3")].find((el) => el.textContent.includes("Completed"))
        .textContent,
    )[1],
  );
  let idx = (await getStorage("idx")) ?? 0;
  const getAllLink = () => $$("a.text-indigo-600");
  if (getAllLink().length != length) {
    [...$$("button[aria-label*=' Week ']")].map((b) => b.click());
    await new Promise((r) => setTimeout(r, 2000));
    [...$$("button[aria-label*=' Week ']")].map((b) => b.click());
    await new Promise((r) => setTimeout(r, 2000));
    [...$$("button[aria-label^='Expand Week ']")].map((b) => b.click());
  }
  const select = () => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(getAllLink()[idx]);
    selection.removeAllRanges();
    selection.addRange(range);
    getAllLink()[idx].scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };
  const open = () => {
    window.open(getAllLink()[idx].href, "_blank").focus();
    next();
  };
  const prev = () => {
    idx = (idx - 1 + length) % length;
    saveIdx();
    select();
  };
  const next = () => {
    idx = (idx + 1) % length;
    saveIdx();
    select();
  };
  const saveIdx = async () => await setStorage({ idx });
  select();
  return {
    next,
    prev,
    open,
  };
};

const onKeyboard = async () => {
  document.addEventListener("keydown", async (event) => {
    const { next, prev, open } = await action();
    if (event.key === "j") {
      next();
    } else if (event.key === "k") {
      prev();
    } else if (event.key === "o") {
      open();
    }
  });
};

(async () => {
  await onKeyboard();
})();
