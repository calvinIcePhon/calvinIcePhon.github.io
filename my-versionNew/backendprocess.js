const IMAGES = getImages();
let LoadedImages = [];
const modal = document.getElementById("Modal");
const modalcontentDOM = document.getElementById("ModalContent");
const modalstatusDOM = document.getElementById("ModalStatus");
const modalButtonDOM = document.getElementById("button");
let Xranges = []; //the differences X coordinates for each images
let Yranges = []; //the differences Y coordinates for each images
const CenterPoint = [];
let image1cas = null;
let image2cas = null;

startload(IMAGES);

/*=============================================*/
async function startload(arr) {
  const promises = arr.map(async (a) => {
    console.log(a);
    try {
      const images = await loadImagesAsync(a);
      //LoadedImages.push();
      LoadedImages.push(new Array(images[0], images[1]));
      //console.log("image:" + LoadedImages);
      let canvasdiff = imagediff.diff(images[0], images[1]);

      let canvasele = imagediff.createCanvas(
        canvasdiff.width,
        canvasdiff.height
      );

      let context = canvasele.getContext("2d");
      context.putImageData(canvasdiff, 0, 0);

      let arr = findNotBlackPixelRanges(canvasele, 0);
      let diffArr = floodFill(canvasele, arr, 10);
      let rectArr = formrec(diffArr);
      let cirArr = findCenterPoint(rectArr);
      CenterPoint.push(cirArr);

      setRanges(diffArr);
      return images;
    } catch (error) {
      console.error(error);
    }
  });

  const loadedImages = await Promise.all(promises);
  modalButtonDOM.style.display = "block";
  return loadedImages;
}

function loadImagesAsync(urls) {
  const promises = urls.map((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", reject);
      img.src = url;
    });
  });

  return Promise.all(promises);
}

function findNotBlackPixelRanges(canvas, blackThreshold = 50) {
  const context = canvas.getContext("2d");
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const notBlackPixels = [];

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    const isBlack =
      red <= blackThreshold &&
      green <= blackThreshold &&
      blue <= blackThreshold;

    if (!isBlack) {
      const x = (i / 4) % canvas.width;
      const y = Math.floor(i / 4 / canvas.width);
      notBlackPixels.push({ x, y });
    }
  }

  return notBlackPixels;
}

function floodFill(canvas, coords, distance) {
  const regions = [];
  const context = canvas.getContext("2d");
  const coordSet = new Set(coords);

  while (coordSet.size > 0) {
    const startCoord = coordSet.values().next().value;
    const region = [];

    const queue = [startCoord];
    while (queue.length > 0) {
      const currentCoord = queue.shift();
      if (coordSet.has(currentCoord)) {
        region.push(currentCoord);
        coordSet.delete(currentCoord);

        for (const coord of coordSet) {
          const dx = coord.x - currentCoord.x;
          const dy = coord.y - currentCoord.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist <= distance) {
            queue.push(coord);
          }
        }
      }
    }

    regions.push(region);
  }

  return regions;
}

function findCenterPoint(Arr) {
  var array = [];
  for (var i = 0; i < Arr.length; i++) {
    var centerX = (Arr[i].x1 + Arr[i].x2) / 2;
    var centerY = (Arr[i].y1 + Arr[i].y2) / 2;
    var radius = Math.min(
      (Arr[i].x2 - Arr[i].x1) / 2,
      (Arr[i].y2 - Arr[i].y1) / 2
    );
    array.push({ cX: centerX, cY: centerY, radius: radius });
  }
  return array;
}

function setRanges(Arr) {
  var Xrange = [];
  var Yrange = [];
  Arr.map((a) => {
    var temp = [];
    a.map((an) => {
      temp.push(an.x);
    });
    Xrange.push(temp);
  });
  Arr.map((a) => {
    var temp = [];
    a.map((an) => {
      temp.push(an.y);
    });
    Yrange.push(temp);
  });

  Xranges.push(Xrange);
  Yranges.push(Yrange);
}

function formrec(Arr) {
  var array = [];
  for (var i = 0; i < Arr.length; i++) {
    var xArr = Arr[i].map((a) => {
      return a.x;
    });
    var yArr = Arr[i].map((a) => {
      return a.y;
    });
    array.push({
      x1: Math.min(...xArr),
      x2: Math.max(...xArr),
      y1: Math.min(...yArr),
      y2: Math.max(...yArr),
    });
  }

  return array;
}
