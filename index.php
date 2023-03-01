<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
   <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="HandheldFriendly" content="true"/>

    <title>Nasa API</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300&display=swap" rel="stylesheet">


    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>

    <script type="text/javascript">

        $(function() {

            $(window).scroll(function() {

                if($(this).scrollTop() != 0) {

                    $('#toTop').fadeIn();

                } else {

                    $('#toTop').fadeOut();

                }

            });

            $('#toTop').click(function() {

                $('body,html').animate({scrollTop:0},800);

            });
            // $('#toTop').touchstart(function() {
            //
            //     $('body,html').animate({scrollTop:0},800);
            //
            // });


        });

    </script>
</head>
<body>
<!-- <audio src="morning.mp3" autoplay loop></audio> -->
<?php $LINK = $_SERVER['REQUEST_URI'];

?>
<div class="main-page-div">
    <div class="header-main-div">
        <div class="left-subheader-div">
            <img src="nasa.svg.png"  alt="NASA API">
        </div>
        <div class="right-subheader-div">

            <div class="menu">
                <nav>
                    <ul>
                        <li><a class="link-home">Home</a></li>
                        <li><a class="link-APOD">Astronomy Picture of the Day</a></li>
                        <li><a class="video-link">Videos</a></li>
                        <li><a class="video-link"><?php echo $LINK;?></a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>

    <div class="central-main-div">
        <div class="top-message-div">
            <h1>Hello, earthlings!</h1>
            <p>Here you can find photos of our planet, the other planets and galaxies too!</p>
        </div>
        <div class="bottom-search-div">
            <form class="search-form">
                <input type="text" name="search-input" placeholder="Search for an image" class="search-input-class">
                <button type="submit" id="search-id" class="test">SEARCH</button>
            </form>
        </div>
    </div>

    <div class="video-back-div">
        <video class="back-video" autoplay loop muted >
            <source src="video.mp4" type="video/webm">
            Your browser does not support the video tag.
        </video>

    </div>


    <div id="toTop"> ^ Наверх </div>

</div>

<script src="script.js"></script>
</body>
</html>

