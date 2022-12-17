import { Ref } from "preact";
import html2canvas from "html2canvas";

export const defaultContent = {
  data: [
    {
      text: "Paste a tweet URL to get started!",
      created_at: "12/12/2022 13:13",
      public_metrics: {
        like_count: 256,
        retweet_count: 43,
        reply_count: 24,
        quote_count: 5,
      },
    },
  ],
  includes: {
    users: [
      {
        name: "David Huertas",
        username: "ikurotime",
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1585667050718085120/LumQqxjx_400x400.jpg",
      },
    ],
    media: [
      {
        media_key: "",
        type: "",
        url: "",
      },
    ],
  },
};
const getImageFile = (canvas: any) =>
  //convert to base64 string
  new Promise((resolve) => {
    canvas.toBlob(function (blob: Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;
        console.log(base64data);
        resolve(base64data);
      };
    });
  });

const saveScreenshot = (canvas: any) => {
  const fileName = "postsnap";
  const link = document.createElement("a");
  link.download = fileName + ".png";
  canvas.toBlob(function (blob: Blob) {
    link.href = URL.createObjectURL(blob);
    link.click();
  });
};
const copyToClipboard = (canvas: any) => {
  canvas.toBlob(function (blob: Blob) {
    navigator.clipboard
      .write([
        new ClipboardItem(
          Object.defineProperty({}, blob.type, {
            value: blob,
            enumerable: true,
          }),
        ),
      ]);
  });
};
export const getImage = (
  captureElement: Ref<HTMLDivElement>,
  type?: string,
) => {
  /* if (captureElement && captureElement.current) {
    return html2canvas(captureElement.current, {
      allowTaint: true,
      backgroundColor: null,
      useCORS: true,
    }).then((canvas: any) => {
      if (type === "save") {
        saveScreenshot(canvas);
      } else if (type === "copy") {
        copyToClipboard(canvas);
      } else {
        return getImageFile(canvas);
      }
    });
  } */
  //englobe the code above in a promise
  return new Promise((resolve) => {
    if (captureElement && captureElement.current) {
      html2canvas(captureElement.current, {
        allowTaint: true,
        backgroundColor: null,
        useCORS: true,
      }).then((canvas: any) => {
        if (type === "save") {
          saveScreenshot(canvas);
        } else if (type === "copy") {
          copyToClipboard(canvas);
        } else {
          resolve(getImageFile(canvas));
        }
      });
    }
  });
};
