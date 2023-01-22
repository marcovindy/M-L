<?php

require_once 'inc/db.php';

$query = $db->prepare('SELECT * FROM aktivity;');
$query->execute();

$activities = $query->fetchAll(PDO::FETCH_ASSOC);
?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CSS Cards</title>
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/all.min.css">
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Montserrat&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css" />
</head>

<body>

  <div class="app">
    <div class="cardList">
      <button class="cardList__btn btn btn--left">
        <div class="icon">
          <svg>
            <use xlink:href="#arrow-left"></use>
          </svg>
        </div>
      </button>

      <div class="cards__wrapper">
        <div class="card current--card">
          <div class="card__image">
            <img src="https://source.unsplash.com/Z8dtTatMVMw" alt="" />
          </div>
        </div>

        <div class="card next--card">
          <div class="card__image">
            <img src="https://source.unsplash.com/9dmycbFE7mQ" alt="" />
          </div>
        </div>

        <div class="card none--card">
          <div class="card__image">
            <img src="https://source.unsplash.com/9dmycbFE7mQ" alt="" />
          </div>
        </div>


        <div class="card none--card">
          <div class="card__image">
            <img src="https://image.pmgstatic.com/cache/resized/w936/files/images/film/posters/163/480/163480407_1baf9a.jpg" alt="" />
          </div>
        </div>

        <?php foreach ($activities as $activity) : array_map('htmlentities', $activity); ?>
          <div class="card none--card">
            <div class="card__image">
              <img src="img/m-l-images/<?= $activity['obrazek'] ?>.jpg" />
            </div>
          </div>

        <?php endforeach; ?>


        <div class="card previous--card">
          <div class="card__image">
            <img src="https://s.yimg.com/ny/api/res/1.2/Tz54pRpoewdR5fskHTUTMg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTU4MDtoPTMyNg--/https://media.zenfs.com/en-US/homerun/motleyfool.com/c8791337125c2b0135df1b7808619a0e" alt="" />
          </div>
        </div>


      </div>

      <button class="cardList__btn btn btn--right">
        <div class="icon">
          <svg>
            <use xlink:href="#arrow-right"></use>
          </svg>
        </div>
      </button>
    </div>

    <div class="infoList">
      <div class="info__wrapper">




        <div class="info current--info">
          <h1 class="text name">Highlands</h1>
          <h4 class="text location">Scotland</h4>
          <p class="text description">The mountains are calling</p>
        </div>

        <div class="info next--info">
          <h1 class="text name">Machu Pichu</h1>
          <h4 class="text location">Peru</h4>
          <p class="text description">Adventure is never far away</p>
        </div>

        <div class="info none--info">
          <h1 class="text name">Chamonix</h1>
          <h4 class="text location">France</h4>
          <p class="text description">Let your dreams come true</p>
        </div>

        <div class="info none--info">
          <h1 class="text name">xx</h1>
          <h4 class="text location">xx</h4>
          <p class="text description">Let your dreams come true</p>
        </div>


        <?php foreach ($activities as $activity) : array_map('htmlentities', $activity); ?>
          <div class="info none--info">
            <!-- <?php if ($activity['hotovo']) : ?>
              <div class="done">
                <img src="img/icons/checkmark.png" alt="hotovo" class="img-done">
              </div>
            <?php endif; ?> -->
            <h1 class="text name"><?= $activity['popis'] ?></h1>
            <h4 class="text location">
            <?php if ($activity['hotovo']) : ?>
            Hotovo
          <?php endif; ?>
            </h4>
            <p class="text description"><?= $activity['popis'] ?></p>
          </div>
        <?php endforeach; ?>


        <div class="info previous--info">
          <h1 class="text name">yy</h1>
          <h4 class="text location">yy</h4>
          <p class="text description">Let your dreams come true</p>
        </div>
      </div>
    </div>


    <div class="app__bg">
      <div class="app__bg__image current--image">
        <img src="https://source.unsplash.com/Z8dtTatMVMw" alt="" />
      </div>
      <div class="app__bg__image next--image">
        <img src="https://source.unsplash.com/9dmycbFE7mQ" alt="" />
      </div>
      <div class="app__bg__image none--image">
        <img src="https://source.unsplash.com/m7K4KzL5aQ8" alt="" />
      </div>
      <div class="app__bg__image none--image">
        <img src="https://source.unsplash.com/m7K4KzL5aQ8" alt="" />
      </div>

      <?php foreach ($activities as $activity) : array_map('htmlentities', $activity); ?>
        <div class="app__bg__image none--image">
          <img src="img/m-l-images/<?= $activity['obrazek'] ?>.jpg" alt="" />
        </div>
      <?php endforeach; ?>

      <div class="app__bg__image previous--image">
        <img src="https://source.unsplash.com/m7K4KzL5aQ8" alt="" />
      </div>
    </div>
  </div>

  <div class="loading__wrapper">
    <div class="loader--text">Loading...</div>
    <div class="loader">
      <span></span>
    </div>
  </div>


  <svg class="icons" style="display: none;">
    <symbol id="arrow-left" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
      <polyline points='328 112 184 256 328 400' style='fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px' />
    </symbol>
    <symbol id="arrow-right" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
      <polyline points='184 112 328 256 184 400' style='fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px' />
    </symbol>
  </svg>

  <script type="text/javascript" src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.3/gsap.min.js"></script>
  <script type="text/javascript" src="script.js"></script>
</body>

</html>