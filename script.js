let key = "HFRtdBD3jyBtyccF7xLF1bGQKFfjSM9FNEfRKgyg";
let addressAPOD = "https://api.nasa.gov/planetary/apod?api_key=HFRtdBD3jyBtyccF7xLF1bGQKFfjSM9FNEfRKgyg";
let addresOfPics = "https://images-api.nasa.gov/search?q=";
let closeBtn = document.getElementById('close-id');
let allLinks = document.querySelector('.right-subheader-div');
let centralDiv = document.querySelector('.central-main-div');


window.onload = function(){
    if (document.documentElement.clientWidth > 760 && document.querySelector('.links-menu') === null)
    {
        createMenuLinksFunc();
        runLinkAPOD();
    }
    if (document.documentElement.clientWidth < 760 && document.querySelector('.menu-btn') === null)
    {
        createBurgerBtnFunc ();
        runLinkAPOD();
    }
}

window.addEventListener('resize', function(event) {
    if (document.documentElement.clientWidth < 760 && document.querySelector('.links-menu') !== null)
    {
        document.querySelector('.links-menu').remove();
        runLinkAPOD();
    }
    if(document.documentElement.clientWidth > 760 && document.querySelector('.links-menu') === null)
        {
            createMenuLinksFunc();
            runLinkAPOD();
    }
    if (document.documentElement.clientWidth > 760 && document.querySelector('.menu-btn') !== null)
    {
        document.querySelector('.menu-btn').remove();
    }
    if (document.documentElement.clientWidth < 760 && document.querySelector('.menu-btn') === null)
    {
        createBurgerBtnFunc ();
    }
});

document.querySelector('.bottom-search-div').addEventListener('click', function(event) {
    if (event.target.matches('button')) {
        event.preventDefault();
        buttonClickEffect();
        createSearchResultFunc();
        connectApiPicsVideo();
    }
});

document.querySelector('.bottom-search-div').addEventListener('touchstart', function(event) {
    if (event.target.matches('button')) {
        event.preventDefault();
        buttonClickEffect();
        createSearchResultFunc();
        connectApiPicsVideo();
    }
});

let linkHome = document.querySelector('.link-home');
linkHome.addEventListener('click', () => {
    //console.log('home');
    document.getElementsByName('search-input')[0].placeholder='search for images';
    document.getElementsByName('search-input')[0].value='';
    document.getElementsByName('search-input')[0].dataset.typeOfSearch = 'image';
})
let linkVideo = document.querySelector('.video-link');
linkVideo.addEventListener('click', () => {
    //console.log('VIDEO');
    document.getElementsByName('search-input')[0].placeholder='search for videos';
    document.getElementsByName('search-input')[0].value='';
    document.getElementsByName('search-input')[0].dataset.typeOfSearch = 'video';
})

function createMenuLinksFunc()
{
    let divMenuLinks = document.createElement('div');
    divMenuLinks.className = 'links-menu';
    divMenuLinks.innerHTML = '<a class="link-home">Home</a>\n' +
        '<a  class ="link-APOD">Astronomy Picture of the Day</a>\n' +
        '<a class="video-link">Videos</a>';
    document.querySelector('.right-subheader-div').prepend(divMenuLinks);
    document.getElementsByName('search-input')[0].dataset.typeOfSearch = 'image';

    let linkHome = document.querySelector('.link-home');
    linkHome.addEventListener('click', () => {
        if(document.querySelector('.search-result')){
            document.querySelector('.search-result').remove();
        }
        document.getElementsByName('search-input')[0].placeholder='search for images';
        document.getElementsByName('search-input')[0].value='';
        document.getElementsByName('search-input')[0].dataset.typeOfSearch = 'image';
    })
    let linkVideo = document.querySelector('.video-link');
    linkVideo.addEventListener('click', () => {
        if(document.querySelector('.search-result')){
            document.querySelector('.search-result').remove();
        }
        document.getElementsByName('search-input')[0].placeholder='search for videos';
        document.getElementsByName('search-input')[0].value='';
        document.getElementsByName('search-input')[0].dataset.typeOfSearch = 'video';
    })
}

function createBurgerBtnFunc()
{
    let menuBtnVar = document.createElement('div');
    menuBtnVar.className = 'menu-btn';
    menuBtnVar.innerHTML = '<span></span>' +
        '<span></span>' +
        '<span></span>';
    document.querySelector('.right-subheader-div').append(menuBtnVar);

    let menuBtn = document.querySelector('.menu-btn');
    let menu = document.querySelector('.menu');
    menuBtn.addEventListener('click', function(){
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
    })
}

function createSearchResultFunc()
{
    if(document.querySelector('.search-result')){
        document.querySelector('.search-result').remove();
    }
    let divResult = document.createElement('div');
    divResult.className = 'search-result';
    document.querySelector('.main-page-div').append(divResult);
}

function createAPODFunc()
{
    let divAPOD = document.createElement('div');
    divAPOD.className = 'modal-APOD-main';
    divAPOD.innerHTML = '<div class="img-div-APOD"></div>' +
        '<div class="content-div-APOD">\n' +
        '            <div class="title-div-APOD"></div>\n' +
        '            <div class="date-div-APOD"></div>\n' +
        '            <div class="text-div-APOD"></div>\n' +
        '        </div>\n';
    document.querySelector('.main-page-div').append(divAPOD);
}

function runLinkAPOD()
{
    let linkAPOD = document.querySelector('.link-APOD');
    linkAPOD.addEventListener('click', () => {
        createAPODFunc();
        connectApiAPOD();
        setTimeout(function timeFunc() {
            allLinks.classList.add('hidden-class');
            centralDiv.classList.add('hidden-class');
            if(document.querySelector('.search-result')){
                document.querySelector('.search-result').classList.add('hidden-class');
            }
        }, 300);
    });
}

function buttonClickEffect() {
    let searchBtn = document.getElementById('search-id');
    searchBtn.classList.add('active-btn');
    setTimeout(function timeFunc() {
        searchBtn.classList.remove('active-btn');
    }, 300);
}

function buttonClickEffectClose()
{
    let closeBtn = document.getElementById('close-id');
    closeBtn.classList.add('active-btn');
    setTimeout(function timeFunc() {
        closeBtn.classList.remove('active-btn');
    }, 300);
}

function connectApiAPOD()
{
    async function fetchAPOD() {
        const response = await fetch(addressAPOD);
        const data = await response.json();
        return data;
    }

    function ShowAPOD() {
        let resultFromApi = fetchAPOD();
        GenerateHtmlForResult(resultFromApi);
    }

    function GenerateHtmlForResult(resultFromApi) {
        resultFromApi.then((result) => {
            //console.log(result);
            const {date, explanation, title, url} = result;
            document.querySelector('.title-div-APOD').innerHTML = '<h2>' + title + '</h2>';
            document.querySelector('.date-div-APOD').innerHTML = '<p>Date: ' + date + '</p>';
            document.querySelector('.text-div-APOD').innerHTML = '<p>' + explanation + '</p>';
            document.querySelector('.img-div-APOD').innerHTML = '<img src="' + url + '" alt="NASA API" style = "border-radius: 20px">';
            let buttonCloseDiv = document.createElement('div');
            buttonCloseDiv.className = 'div-button-close';
            buttonCloseDiv.innerHTML = '<button type="button" id="close-id" class="test">CLOSE</button>';
            document.querySelector('.modal-APOD-main').append(buttonCloseDiv);
            runCloseBtnFunc();
            }
        )
    }

    ShowAPOD();
}

function connectApiPicsVideo()
{

    if (document.querySelector('.search-result') !== null) {
        document.querySelector('.search-result').remove();
    }
    let searchResult = document.createElement('div');
    searchResult.className = 'search-result';
    document.querySelector('.main-page-div').append(searchResult);

    let query = document.querySelector('.search-input-class').value;
    async function fetchPics() {
        const response = await fetch('' + addresOfPics + '' + query + '');
        const data = await response.json();
        return data;
    }

    function ShowPics() {
                let resultFromApi = fetchPics();
                GenerateHtmlForResult(resultFromApi);
                function GenerateHtmlForResult(resultFromApi) {
                    resultFromApi.then((result) => {
                        let videoType = document.getElementsByName('search-input')[0].dataset.typeOfSearch;
                            for (let index = 1; index < result.collection.items.length; index++) {
                                let mediatype = result.collection.items[index].data[0].media_type;
                                console.log(mediatype);
                                let title = result.collection.items[index].data[0].title;
                                if (videoType === 'video' && mediatype === 'video') {
                                    async function fetchVideo() {
                                        let pathVideoJson = result.collection.items[index].href;
                                        const response = await fetch(pathVideoJson);
                                        const data = await response.json();
                                        return data;
                                    }
                                    function ShowVideo() {
                                        let resultFromApi = fetchVideo();
                                        GenerateHtmlForResult(resultFromApi);
                                        function GenerateHtmlForResult(resultFromApi) {
                                            resultFromApi.then((resultVideo) => {
                                    let pathCurrentVideo = resultVideo[2];
                                                //console.log(pathCurrentVideo);
                                    let oneItemDiv = document.createElement('a');
                                    oneItemDiv.className = 'one-item-main';
                                    oneItemDiv.innerHTML = '<div class="pic-one-item"><video class="video-one-item" controls><source src="'+pathCurrentVideo+'" type="video/webm"></video></div>' +
                                        '<div class="title-one-item"><h3>' + title + '</h3></div>';
                                    document.querySelector('.search-result').append(oneItemDiv);
                                            })}
                                    }
                                    ShowVideo()
                                }
                                if (videoType === 'image' && mediatype === 'image') {
                                    let picture = result.collection.items[index].links[0].href;
                                    let description = result.collection.items[index].data[0].description;

                                    let oneItemDiv = document.createElement('a');
                                    oneItemDiv.className = 'one-item-main';
                                    oneItemDiv.innerHTML = '<div class="pic-one-item" style="background-image: url('+picture+'); background-position: center; background-size: cover;"></div>' +
                                                            '<div class="title-one-item"><h3>' + title + '</h3></div>'
                                    document.querySelector('.search-result').append(oneItemDiv);
                                }
                            }
                        }
                    )
                }
            }
            ShowPics();
}

function runCloseBtnFunc()
{
    document.querySelector('.div-button-close').addEventListener('click', function(event) {
        if (event.target.matches('button')) {
            event.preventDefault();
            buttonClickEffectClose();
            setTimeout(function timeFunc() {
                if (document.querySelector('.search-result') !== null) {
                    document.querySelector('.search-result').classList.remove('hidden-class');
                }
                allLinks.classList.remove('hidden-class');
                centralDiv.classList.remove('hidden-class');
                document.querySelector('.modal-APOD-main').remove();
            }, 300);
        }
    });

    document.querySelector('.div-button-close').addEventListener('touchstart', function(event) {
        if (event.target.matches('button')) {
            event.preventDefault();
            buttonClickEffectClose();
            setTimeout(function timeFunc() {
                if (document.querySelector('.search-result') !== null) {
                    document.querySelector('.search-result').classList.remove('hidden-class');
                }
                allLinks.classList.remove('hidden-class');
                centralDiv.classList.remove('hidden-class');
                document.querySelector('.modal-APOD-main').remove();
            }, 300);
        }
    });
}


// window.history.pushState("object or string", "Title", "/new-url");