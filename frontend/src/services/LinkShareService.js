const mainUrl = process.env.REACT_APP_MAIN_URL;
const content = "Добро пожаловать в Коробку!";
const shareLinks = {
    tg: `https://telegram.me/share/url?url=${mainUrl}&text=${content}&utm_source=share2`,
    vk: `https://vk.com/share.php?url=${mainUrl}&title=${content}&description=dsfsdf`,
    inst: `https://instagram.com/lisaparkerlisaparker/?ref=${mainUrl}`,
}

const getWindowSize = () => {
    let width = 600;
    let height = 450;
    if (window.screen.width < 744) {
        width = window.screen.width;
        height = window.screen.height;
    }
    return {'width': width, 'height': height};
}

const getWindow = () => {
    let width = getWindowSize().width;
    let height = getWindowSize().height;
    return `Toolbar=1,Location=0,Directories=0,Status=0,Menubar=0,Scrollbars=0,Resizable=0,Width=${width},Height=${height}`;
}

export const linkShareService = {
    clickInst() {
      window.open(shareLinks.inst,'', getWindow())
    },

    clickTg() {
      window.open(shareLinks.tg,'', getWindow())
    },

    clickVk() {
      window.open(shareLinks.vk,'', getWindow())
    }
}

export const share = (link=process.env.REACT_APP_MAIN_URL) => {
    if (navigator.share) {
        navigator.share({
            title: 'korobkaplay.ru',
            text: 'Откройте для себя мир футбола!',
            url: link,
        })
            .then(() => console.log('Удалось поделиться'))
            .catch((error) => console.log('Не удалось поделиться', error));
    }
}