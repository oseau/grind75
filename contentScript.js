const action = async (start = 0) => {
  const length = parseInt(/\/.*?(\d+)/.exec([...document.querySelectorAll("h3")].find(el => el.textContent.includes("Completed")).textContent)[1])
  let idx = start
  const getAllLink = () => document.querySelectorAll("a.text-indigo-600")
  if (getAllLink().length != length) {
    [...document.querySelectorAll("button[aria-label*=' Week ']")].map((b) => b.click())
    await new Promise(r => setTimeout(r, 2000));
    [...document.querySelectorAll("button[aria-label*=' Week ']")].map((b) => b.click())
    await new Promise(r => setTimeout(r, 2000));
    [...document.querySelectorAll("button[aria-label^='Expand Week ']")].map((b) => b.click())
  }
  const select = () => {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(getAllLink()[idx])
    selection.removeAllRanges()
    selection.addRange(range)
    getAllLink()[idx].scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    })
  }
  const open = () => {
    window.open(getAllLink()[idx].href.replace("leetcode.com/", "leetcode.cn/"), "_blank").focus()
    next()
  }
  const prev = () => {
    idx = (idx - 1 + length) % length
    select()
  }
  const next = () => {
    idx = (idx + 1) % length
    select()
  }
  select()
  return {
    next,
    prev,
    open,
  }
}

const onKeyboard = async () => {
  const { next, prev, open } = await action()
  document.addEventListener('keydown', (event) => {
    if (event.key === "j") {
      next()
    } else if (event.key === "k") {
      prev()
    } else if (event.key === "o") {
      open()
    }
  })
}

(async () => {
  await onKeyboard()
})()
