function forceDownload(blobUrl: string, filename: string) {
  let a: any = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function downloadPhoto(url: string, filename: string) {
  if (!filename) {
    filename = url.split("\\").pop()?.split("/").pop() || "";
  }
  console.log("filename in download image",filename );
  console.log("url in download image",url );
  fetch(url, {
    headers: new Headers({
      Origin: window.location.origin,
    }),
    mode: "no-cors",
  })
    .then((response) => response.blob())
    .then((blob) => {
      let blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, filename);
    })
    .catch((e) => console.error(e));
}
