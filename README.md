## Epey Discord Bot

[epey.com](https://www.epey.com) verilerini, Discord sunucunuzda gösterebileceğiniz basit bir Discord botu. Sistem olarak direkt olarak sunucudan attığı istekle tüm sayfayı işleyip gerekli verileri toplar ve size döndürür.

Çalışması için ürünlerin tam URL'si gereklidir (epey.com'un herhangi bir API olmaması dolayısıyla daha iyi bir yöntem yok), ileride bu geliştirilip daha kolay hale gelecektir.

Sürekli aynı IP'den giden istekler, epey.com tarafından reddedilebilir ve devamlı istekler sonrasında IP'nizin yasaklanmasına neden olabilir. Bu yüzden bu bot, herkese açık kullanıma uygun değildir. Kendiniz ufak sunucularınızda kullanabilirsiniz.

## Ekran Görüntüleri

<center><img alt="branding" src="https://the-person-under-this-message.is-inside.me/7qFNVZZI.png" /></center>

## Kurulum

- Gerekli paketleri ister `yarn` (`yarn`'ı yüklemek için `npm i -g yarn`), ister `npm` ile kurun.
  - `yarn` ile kuracaklar için: `yarn`
  - `npm` ile kuracaklar için: `npm install`
- `.env.example` dosyasının adını `.env` olarak değiştirin ve gerekli bilgileri doldurun.
- Kodu geliştirici (`dev`) modunda çalıştırın.
  - `yarn` ile: `yarn dev`,
  - `npm` ile: `npm run dev`

## Kullanılan Kütüphaneler

- [Eris](https://github.com/abalabahaha/eris) - Discord kütüphanesi
- [terminal-bigtext-generator](https://github.com/itsSayantan/terminal-bigtext-generator) - konsola büyük yazı çıktısı
- [webscrape](https://github.com/masotime/webscrape) - epey.com sitesini çözümleyip veri çekmek için

Teşekkürler [dondish/TypeScriptBot](https://github.com/dondish/TypeScriptBot) ve [Timeraa/DevScript](https://github.com/Timeraa/DevScript).
