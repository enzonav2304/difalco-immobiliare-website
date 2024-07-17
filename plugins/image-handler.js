import Vue from 'vue'

Vue.mixin({
  methods: {
    test_image: async function(url, idx) {
      console.log('inspecting test_image_function...')
      const _img = this.imageSize(await this.fileImage(url, 'example.jpg'))//'example' + [idx] + '.jpg'))
      _img.then(async value => {
        console.log(value.src) // 👉️ "hello"
        //let img = value.src
        if(document.getElementById('my_img')) {
          console.log('div is true')
          let img = document.createElement('img')
          let my_div = document.getElementById('my_img')
          img.setAttribute('src', value.src)
          img.setAttribute('id', 1)
          my_div.appendChild(img)
        } else {
          console.log('div is false')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    imageSize (image) {
      return new Promise((resolve, reject) => {
        try {
          const fileReader = new FileReader()
          fileReader.onload = () => {
            const img = new Image()
            img.onload = () => {
              console.log('function testing images...')
              console.log('desidered aspect ratio: ', 612/400)
              console.log(img.width + 'x' + img.height)
              img.width > img.height ? console.log('orizontal-true') : console.log('orizontal-false')
              //console.log('test new function ', this.determineNewHeight(img.height, img.width, 612))
              console.log('result aspect ratio: ', img.width/img.height)
              console.log('done!')
              resolve({ src: img.src, width: img.width, height: img.height })
            }
            img.src = fileReader.result
          }
          fileReader.readAsDataURL(image)
        } catch (e) {
          reject(e)
        }
      })
    },
    /*
    async function loopAndSendArray() {
      let lastSend;
      for (const val of arrayToSend) {
        const calculatedVal = calculate(val);
        await lastSend;
        lastSend = send(calculatedVal)
      }
      await lastSend;
    }
    loopAndSendArray();
    */
    fileImage: async function(url, name, defaultType = 'image/jpeg') {
      const response = await fetch(url)
      const data = await response.blob()
      return new File([data], name, {
        type: data.type || defaultType
      })
    },
    determineNewHeight: function(originalHeight, originalWidth, newWidth) {
      return (originalHeight / originalWidth) * newWidth
    },
    async my_imageSize(image) {
      console.log('new image size function')
      return new Promise((resolve, reject) => {
          console.log('resolve callback')
          try {
              const fileReader = new FileReader()
              fileReader.onload = () => {
                  const img = new Image()
                  img.onload = () => {
                      console.log('NEW function testing images...')
                      //console.log('desidered aspect ratio: ', 612/400)
                      //if(img.width > img.height) {
                          if(img) {
                          //console.log('orizontal-true')
                          console.log('desidered aspect ratio: ', 400/612 * 612)
                          console.log('computed size :', img.width + 'x' + img.height)
                          console.log('result aspect ratio: ' + img.height/img.width * 612)
                          console.log('ratio w/h:' + img.width/img.height)
                          console.log('ratio 1: ' + img.width/612)
                          console.log('ratio 2: ' + img.height/400)
                          console.log('test ratio: ' + img.width/612 + img.height/400)
                          //console.log('NEW computed size :', img.width + 'x' + img.height)
                          resolve(img)
                      } /* else {
                          console.log('orizontal-false')
                      }*/
                      /*
                      img.width > img.height ? console.log('orizontal-true') : console.log('orizontal-false')
                      //console.log('test new function ', this.determineNewHeight(img.height, img.width, 612))
                      console.log('NEW result aspect ratio: ', img.width/img.height)
                      console.log('test is done!')
                      resolve(img)
                      */
                  }
                  img.src = fileReader.result
              }
              fileReader.readAsDataURL(image)
          } catch (e) {
              console.log('there is an error')
              reject()
          }
      })
  },
  test_image2: async function(array) {
      console.log('welcome in new test function')
      console.log('iterating test image array...')
      //this.my_imageSize(array)
      let test_image = array[0]
      const _img = this.my_imageSize(await this.fileImage(test_image, 'example.jpg'))
  },
  test_image1: async function(array) {
      let i = 0
      //let my_img = loadImage(array[i])
      //console.log(this.test_image1(await my_img))
      var myImage = new Image()
      this.imgLoad(array[i])        
        .then(function(response) {
          var imageURL = window.URL.createObjectURL(response)
          myImage.src = imageURL
          console.log('testing images...')
          console.log('desidered aspect ratio: ', 612/400)
          console.log(myImage.width + 'x' + myImage.height)
          myImage.width > myImage.height ? console.log('orizontal-true') : console.log('orizontal-false')
          //console.log('test new function ', this.determineNewHeight(img.height, img.width, 612))
          console.log('result aspect ratio: ', myImage.width/myImage.height)
          console.log('done!')
          //body.appendChild(myImage);
        }, function(Error) {
          console.log(Error)
        })
    },
    imageSize1: function(image) {
      return new Promise((resolve, reject) => {
        try {
          const fileReader = new FileReader()
          fileReader.onload = () => {
            const img = new Image()
            img.onload = () => {
              console.log('testing images...')
              console.log('desidered aspect ratio: ', 612/400)
              console.log(img.width + 'x' + img.height)
              if(img.width > img.height) {
                if(img.width/img.height < 1.75 && img.width/img.height > 1.49)
                resolve({img})
              }
              img.src = fileReader.result
            }  
          }
          fileReader.readAsDataURL(image)
        } catch (e) {
          reject(e)
        }
      })
    },
    imgLoad: function(url) {
      return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest()
        request.open('GET', url)
        request.responseType = 'blob'
        request.onload = function() {
          if (request.status === 200) {
            resolve(request.response);
          } else {
            reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
          }
        }
        request.onerror = function() {
          reject(Error('There was a network error.'));
        }        
        request.send()
      })
    },
    /*
    var body = document.querySelector('body')
    var myImage = new Image()
    imgLoad('myLittleVader.jpg')
      .then(function(response) {
        var imageURL = window.URL.createObjectURL(response)
        myImage.src = imageURL
        body.appendChild(myImage);
      }, function(Error) {
        console.log(Error)
      }
    */
    loadLazyImages: function() {
      console.log('control: loadLazyImage function')
      document.addEventListener("DOMContentLoaded", function() {
        var lazyloadImages;
        if ("IntersectionObserver" in window) {
          lazyloadImages = document.querySelectorAll(".lazy");
          var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                var image = entry.target;
                image.src = image.dataset.src;
                if (image.dataset.lowsrc) {
                  image.src = image.dataset.lowsrc;
                }
                image.classList.remove("lazy");
                imageObserver.unobserve(image);
              }
            });
          });
          lazyloadImages.forEach(function(image) {
            imageObserver.observe(image);
          });
        } else {  
          var lazyloadThrottleTimeout;
          lazyloadImages = document.querySelectorAll(".lazy");
          function lazyload () {
            if(lazyloadThrottleTimeout) {
              clearTimeout(lazyloadThrottleTimeout);
            }
            lazyloadThrottleTimeout = setTimeout(function() {
              var scrollTop = window.pageYOffset;
              lazyloadImages.forEach(function(img) {
                if(img.offsetTop < (window.innerHeight + scrollTop)) {
                  img.src = img.dataset.src;
                  if (img.dataset.lowsrc) {
                    img.src = img.dataset.lowsrc;
                  }
                  img.classList.remove('lazy');
                }
              });
              if(lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload);
                window.removeEventListener("resize", lazyload);
                window.removeEventListener("orientationChange", lazyload);
              }
            }, 20);
          }
          document.addEventListener("scroll", lazyload);
          window.addEventListener("resize", lazyload);
          window.addEventListener("orientationChange", lazyload);
        }
      })
    },
    loadLazyImagesCopia: function(){
      document.addEventListener("DOMContentLoaded", function() {
        var lazyloadImages
        if ("IntersectionObserver" in window) {
          lazyloadImages = document.querySelectorAll(".lazy")
          var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                var image = entry.target
                image.src = image.dataset.src
                image.classList.remove("lazy")
                imageObserver.unobserve(image)
              }
            })
          })
          lazyloadImages.forEach(function(image) {
            imageObserver.observe(image)
          })
        } else {  
          var lazyloadThrottleTimeout
          lazyloadImages = document.querySelectorAll(".lazy")
          function lazyload () {
            if(lazyloadThrottleTimeout) {
              clearTimeout(lazyloadThrottleTimeout)
            }
            lazyloadThrottleTimeout = setTimeout(function() {
              var scrollTop = window.pageYOffset
              lazyloadImages.forEach(function(img) {
                if(img.offsetTop < (window.innerHeight + scrollTop)) {
                  img.src = img.dataset.src
                  img.classList.remove('lazy')
                }
              })
              if(lazyloadImages.length == 0) {
                document.removeEventListener("scroll", lazyload)
                window.removeEventListener("resize", lazyload)
                window.removeEventListener("orientationChange", lazyload)
              }
            }, 20)
          }
          document.addEventListener("scroll", lazyload);
          window.addEventListener("resize", lazyload);
          window.addEventListener("orientationChange", lazyload)
        }
      })
    }
  }
})