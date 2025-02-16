let ePortfolioJS = {

  bigImgEl : null,
  numImgs : null,

  init : function() {
    setTimeout(ePortfolioJS.initNavbar, 10);

    // Shorten the navbar after scrolling a little bit down
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar").addClass("top-nav-short");
        } else {
            $(".navbar").removeClass("top-nav-short");
        }
    });

    // On mobile, hide the logoimg when expanding the navbar menu
    $('#main-navbar').on('show.bs.collapse', function () {
      $(".navbar").addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      $(".navbar").removeClass("top-nav-expanded");
    });

    // show the big header image
    ePortfolioJS.initImgs();

    ePortfolioJS.initSearch();
  },

  initNavbar : function() {
    const rgb = $('.navbar').css("background-color").replace(/[^\d,]/g,'').split(",");
    const brightness = Math.round((
      parseInt(rgb[0]) * 299 +
      parseInt(rgb[1]) * 587 +
      parseInt(rgb[2]) * 114
    ) / 1000);
    if (brightness <= 125) {
      $(".navbar").removeClass("navbar-light").addClass("navbar-dark");
    } else {
      $(".navbar").removeClass("navbar-dark").addClass("navbar-light");
    }
  },

  initImgs : function() {
    // If the page was large images to randomly select from, choose an image
    if ($("#header-big-imgs").length > 0) {
      ePortfolioJS.bigImgEl = $("#header-big-imgs");
      ePortfolioJS.numImgs = ePortfolioJS.bigImgEl.attr("data-num-img");

      // 2fc73a3a967e97599c9763d05e564189
      // set an initial image
      const imgInfo = ePortfolioJS.getImgInfo();
      const src = imgInfo.src;
      const desc = imgInfo.desc;
      ePortfolioJS.setImg(src, desc);

      // For better UX, prefetch the next image so that it will already be loaded when we want to show it
      const getNextImg = function() {
        const imgInfo = ePortfolioJS.getImgInfo();
        const src = imgInfo.src;
        const desc = imgInfo.desc;

        const prefetchImg = new Image();
        prefetchImg.src = src;
        // if I want to do something once the image is ready: `prefetchImg.onload = function(){}`

        setTimeout(function(){
          const img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
          $(".intro-header.big-img").prepend(img);
          setTimeout(function(){ img.css("opacity", "1"); }, 50);

          // after the animation of fading in the new image is done, prefetch the next one
          //img.one("transitioned webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
          setTimeout(function() {
            ePortfolioJS.setImg(src, desc);
            img.remove();
            getNextImg();
          }, 1000);
          //});
        }, 6000);
      };

      // If there are multiple images, cycle through them
      if (ePortfolioJS.numImgs > 1) {
        getNextImg();
      }
    }
  },

  getImgInfo : function() {
    const randNum = Math.floor((Math.random() * ePortfolioJS.numImgs) + 1);
    const src = ePortfolioJS.bigImgEl.attr("data-img-src-" + randNum);
    const desc = ePortfolioJS.bigImgEl.attr("data-img-desc-" + randNum);

    return {
      src : src,
      desc : desc
    }
  },

  setImg : function(src, desc) {
    $(".intro-header.big-img").css("background-image", 'url(' + src + ')');
    if (typeof desc !== typeof undefined && desc !== false) {
      $(".img-desc").text(desc).show();
    } else {
      $(".img-desc").hide();
    }
  }
};

// On Load, initJS
document.addEventListener('DOMContentLoaded', ePortfolioJS.init);

// Event Listener for toggling PSA Card Expand/Collapse 
document.addEventListener('DOMContentLoaded', function() {
  const toggleAllBtn = document.getElementById('toggleAllPSA');

  const collapses = ['refCollapse', 'skillsCollapse', 'planCollapse'];
  const expandIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon-git mr-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 10.146a.5.5 0 0 1 .708 0L8 13.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708m0-4.292a.5.5 0 0 0 .708 0L8 2.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8"/>
            </svg>`;
  const collapseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon-git mr-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 14.854a.5.5 0 0 0 .708 0L8 11.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708m0-13.708a.5.5 0 0 1 .708 0L8 4.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8"/>
            </svg>`;

  toggleAllBtn.addEventListener('click', function() {
    const isExpand = toggleAllBtn.textContent.trim() === 'Expand All';

    collapses.forEach(function(collapseId) {
      const el = document.getElementById(collapseId);
      if (!el) return;
      if (isExpand && !el.classList.contains('show')) {
        $(el).collapse('show');
      }
      else if (!isExpand && el.classList.contains('show')) {
        $(el).collapse('hide');
      }
    });

    toggleAllBtn.innerHTML = isExpand ? `${collapseIcon} Collapse All`
                  : `${expandIcon} Expand All`;
  });

  collapses.forEach(function(collapseId) {
    const el = document.getElementById(collapseId);
    if (!el) return;

    $(el).on('shown.bs.collapse hidden.bs.collapse', function() {
      const allOpen = collapses.every(function(id) {
        return document.getElementById(id).classList.contains('show');
      });

      toggleAllBtn.innerHTML = allOpen ? `${collapseIcon} Collapse All`
      : `${expandIcon} Expand All`;
    });
  });
});

// Event Listener for toggling CR Card Expand/Collapse 
document.addEventListener('DOMContentLoaded', function() {
  const toggleAllBtn = document.getElementById('toggleAllCR');

  const collapses = ['croCollapse', 'acrCollapse'];
  const expandIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon-git mr-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 10.146a.5.5 0 0 1 .708 0L8 13.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708m0-4.292a.5.5 0 0 0 .708 0L8 2.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8"/>
            </svg>`;
  const collapseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon-git mr-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 14.854a.5.5 0 0 0 .708 0L8 11.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708m0-13.708a.5.5 0 0 1 .708 0L8 4.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8"/>
            </svg>`;


  toggleAllBtn.addEventListener('click', function() {
    const isExpand = toggleAllBtn.textContent.trim() === 'Expand All';

    collapses.forEach(function(collapseId) {
      const el = document.getElementById(collapseId);
      if (!el) return;
      if (isExpand && !el.classList.contains('show')) {
        $(el).collapse('show');
      }
      else if (!isExpand && el.classList.contains('show')) {
        $(el).collapse('hide');
      }
    });

    toggleAllBtn.innerHTML = isExpand ? `${collapseIcon} Collapse All`
                  : `${expandIcon} Expand All`;
  });
  collapses.forEach(function(collapseId) {
    const el = document.getElementById(collapseId);
    if (!el) return;

    $(el).on('shown.bs.collapse hidden.bs.collapse', function() {
      const allOpen = collapses.every(function(id) {
        return document.getElementById(id).classList.contains('show');
      });

      toggleAllBtn.innerHTML = allOpen ? `${collapseIcon} Collapse All`
      : `${expandIcon} Expand All`;
    });
  });
});

// Event Listener for toggling SDE Card Expand/Collapse 
document.addEventListener('DOMContentLoaded', function() {
  const toggleAllBtn = document.getElementById('toggleAllSDE');

  const collapses = ['ar1Collapse', 'enh1Collapse', 'bp1Collapse', 'cr1Collapse', 'flcCollapse'];
  const expandIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon-git mr-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 10.146a.5.5 0 0 1 .708 0L8 13.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708m0-4.292a.5.5 0 0 0 .708 0L8 2.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8"/>
            </svg>`;
  const collapseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon-git mr-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 14.854a.5.5 0 0 0 .708 0L8 11.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708m0-13.708a.5.5 0 0 1 .708 0L8 4.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8"/>
            </svg>`;


  toggleAllBtn.addEventListener('click', function() {
    const isExpand = toggleAllBtn.textContent.trim() === 'Expand All';

    collapses.forEach(function(collapseId) {
      const el = document.getElementById(collapseId);
      if (!el) return;
      if (isExpand && !el.classList.contains('show')) {
        $(el).collapse('show');
      }
      else if (!isExpand && el.classList.contains('show')) {
        $(el).collapse('hide');
      }
    });

    toggleAllBtn.innerHTML = isExpand ? `${collapseIcon} Collapse All`
                  : `${expandIcon} Expand All`;
  });
  collapses.forEach(function(collapseId) {
    const el = document.getElementById(collapseId);
    if (!el) return;

    $(el).on('shown.bs.collapse hidden.bs.collapse', function() {
      const allOpen = collapses.every(function(id) {
        return document.getElementById(id).classList.contains('show');
      });

      toggleAllBtn.innerHTML = allOpen ? `${collapseIcon} Collapse All`
      : `${expandIcon} Expand All`;
    });
  });
});

// Event Listener for toggling DSA Card Expand/Collapse 
document.addEventListener('DOMContentLoaded', function() {
  const toggleAllBtn = document.getElementById('toggleAllDSA');

  const collapses = ['ar2Collapse', 'enh2Collapse', 'bp2Collapse', 'cr2Collapse', 'efgCollapse'];
  const expandIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon-git mr-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 10.146a.5.5 0 0 1 .708 0L8 13.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708m0-4.292a.5.5 0 0 0 .708 0L8 2.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8"/>
            </svg>`;
  const collapseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon-git mr-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 14.854a.5.5 0 0 0 .708 0L8 11.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708m0-13.708a.5.5 0 0 1 .708 0L8 4.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8"/>
            </svg>`;

  toggleAllBtn.addEventListener('click', function() {
    const isExpand = toggleAllBtn.textContent.trim() === 'Expand All';

    collapses.forEach(function(collapseId) {
      const el = document.getElementById(collapseId);
      if (!el) return;
      if (isExpand && !el.classList.contains('show')) {
        $(el).collapse('show');
      }
      else if (!isExpand && el.classList.contains('show')) {
        $(el).collapse('hide');
      }
    });

    toggleAllBtn.innerHTML = isExpand ? `${collapseIcon} Collapse All`
                  : `${expandIcon} Expand All`;
  });
  collapses.forEach(function(collapseId) {
    const el = document.getElementById(collapseId);
    if (!el) return;

    $(el).on('shown.bs.collapse hidden.bs.collapse', function() {
      const allOpen = collapses.every(function(id) {
        return document.getElementById(id).classList.contains('show');
      });

      toggleAllBtn.innerHTML = allOpen ? `${collapseIcon} Collapse All`
      : `${expandIcon} Expand All`;
    });
  });
});

// Event Listener for toggling DB Card Expand/Collapse 
document.addEventListener('DOMContentLoaded', function() {
  const toggleAllBtn = document.getElementById('toggleAllDB');

  const collapses = ['ar3Collapse', 'enh3Collapse', 'bp3Collapse', 'cr3Collapse', 'dbdCollapse'];
  const expandIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon-git mr-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 10.146a.5.5 0 0 1 .708 0L8 13.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708m0-4.292a.5.5 0 0 0 .708 0L8 2.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8"/>
            </svg>`;
  const collapseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon-git mr-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 14.854a.5.5 0 0 0 .708 0L8 11.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708m0-13.708a.5.5 0 0 1 .708 0L8 4.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8"/>
            </svg>`;


  toggleAllBtn.addEventListener('click', function() {
    const isExpand = toggleAllBtn.textContent.trim() === 'Expand All';

    collapses.forEach(function(collapseId) {
      const el = document.getElementById(collapseId);
      if (!el) return;
      if (isExpand && !el.classList.contains('show')) {
        $(el).collapse('show');
      }
      else if (!isExpand && el.classList.contains('show')) {
        $(el).collapse('hide');
      }
    });

    toggleAllBtn.innerHTML = isExpand ? `${collapseIcon} Collapse All`
                  : `${expandIcon} Expand All`;
  });
  collapses.forEach(function(collapseId) {
    const el = document.getElementById(collapseId);
    if (!el) return;

    $(el).on('shown.bs.collapse hidden.bs.collapse', function() {
      const allOpen = collapses.every(function(id) {
        return document.getElementById(id).classList.contains('show');
      });

      toggleAllBtn.innerHTML = allOpen ? `${collapseIcon} Collapse All`
      : `${expandIcon} Expand All`;
    });
  });
});

// Event Listener for toggling EA Card Expand/Collapse 
document.addEventListener('DOMContentLoaded', function() {
  const toggleAllBtn = document.getElementById('toggleAllEA');

  const collapses = ['sumCollapse', 'scCollapse', 'tryCollapse'];
  const expandIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon-git mr-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 10.146a.5.5 0 0 1 .708 0L8 13.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708m0-4.292a.5.5 0 0 0 .708 0L8 2.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8"/>
            </svg>`;
  const collapseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon-git mr-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.646 14.854a.5.5 0 0 0 .708 0L8 11.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708m0-13.708a.5.5 0 0 1 .708 0L8 4.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8"/>
            </svg>`;


  toggleAllBtn.addEventListener('click', function() {
    const isExpand = toggleAllBtn.textContent.trim() === 'Expand All';

    collapses.forEach(function(collapseId) {
      const el = document.getElementById(collapseId);
      if (!el) return;
      if (isExpand && !el.classList.contains('show')) {
        $(el).collapse('show');
      }
      else if (!isExpand && el.classList.contains('show')) {
        $(el).collapse('hide');
      }
    });

    toggleAllBtn.innerHTML = isExpand ? `${collapseIcon} Collapse All`
                  : `${expandIcon} Expand All`;
  });
  collapses.forEach(function(collapseId) {
    const el = document.getElementById(collapseId);
    if (!el) return;

    $(el).on('shown.bs.collapse hidden.bs.collapse', function() {
      const allOpen = collapses.every(function(id) {
        return document.getElementById(id).classList.contains('show');
      });

      toggleAllBtn.innerHTML = allOpen ? `${collapseIcon} Collapse All`
      : `${expandIcon} Expand All`;
    });
  });
});

// Event Listener for toggling All Cards Expand/Collapse 
document.addEventListener('DOMContentLoaded', function() {
  const toggleAllBtn = document.getElementById('toggleAllCards');
  const collapses = ['sumCollapse', 'scCollapse', 'tryCollapse',
                    'ar3Collapse', 'enh3Collapse', 'bp3Collapse',
                    'cr3Collapse', 'dbdCollapse', 'ar2Collapse',
                    'enh2Collapse', 'bp2Collapse', 'cr2Collapse',
                    'efgCollapse', 'ar1Collapse', 'enh1Collapse',
                    'bp1Collapse', 'cr1Collapse', 'flcCollapse',
                  'refCollapse', 'skillsCollapse', 'planCollapse']
  const expandIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon-git-light mr-2" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M3.646 10.146a.5.5 0 0 1 .708 0L8 13.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708m0-4.292a.5.5 0 0 0 .708 0L8 2.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8"/>
          </svg>`;
  const collapseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="icon-git-light mr-2" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M3.646 14.854a.5.5 0 0 0 .708 0L8 11.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708m0-13.708a.5.5 0 0 1 .708 0L8 4.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8"/>
          </svg>`;

  toggleAllBtn.dataset.state = "expand";
  toggleAllBtn.innerHTML = `${expandIcon} Expand All`;

  toggleAllBtn.addEventListener('click', function() {
    const isExpand = (toggleAllBtn.dataset.state === "expand");

    collapses.forEach(function(collapseId) {
      const el = document.getElementById(collapseId);
      if (!el) return;
      if (isExpand && !el.classList.contains('show')) {
        $(el).collapse('show');
      }
      else if (!isExpand && el.classList.contains('show')) {
        $(el).collapse('hide');
      }
    });

    toggleAllBtn.dataset.state = isExpand ? "collapse" : "expand";
    toggleAllBtn.innerHTML = isExpand ? `${collapseIcon} Collapse All` : `${expandIcon} Expand All`;
  });

  collapses.forEach(function(collapseId) {
    const el = document.getElementById(collapseId);
    if (!el) return;

    $(el).on('shown.bs.collapse hidden.bs.collapse', function() {
      const allOpen = collapses.every(function(id) {
        return document.getElementById(id).classList.contains('show');
      });
      if (allOpen) {
        toggleAllBtn.dataset.state = "collapse";
        toggleAllBtn.innerHTML = `${collapseIcon} Collapse All`;
      } else {
        toggleAllBtn.dataset.state = "expand";
        toggleAllBtn.innerHTML = `${expandIcon} Expand All`;
      }
    });
  });
});