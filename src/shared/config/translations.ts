export type Lang = 'ru' | 'uz' | 'en'

export const translations = {
  // ── Navbar ──
  'nav.home':       { ru: 'Главная',    uz: 'Bosh sahifa', en: 'Home'        },
  'nav.products':   { ru: 'Продукты',   uz: 'Mahsulotlar', en: 'Products'    },
  'nav.contact':    { ru: 'Контакты',   uz: 'Aloqa',       en: 'Contact'     },
  'nav.shop':       { ru: 'Магазин',    uz: 'Do\'kon',     en: 'Shop'        },
  'nav.catalog':    { ru: 'Каталог',    uz: 'Katalog',     en: 'Catalog'     },
  'nav.science':    { ru: 'Наука',      uz: 'Fan',         en: 'Science'     },
  'nav.blog':       { ru: 'Блог',       uz: 'Blog',        en: 'Blog'        },
  'nav.learn':      { ru: 'О нас',      uz: 'Biz haqida',  en: 'About'       },
  'nav.getStarted': { ru: 'Начать',     uz: 'Boshlash',    en: 'Get Started' },
  'nav.cart':       { ru: 'Корзина',    uz: 'Savat',       en: 'Cart'        },

  // ── Hero ──
  'hero.badge':     { ru: 'Формула с научным обоснованием', uz: 'Ilmiy asoslangan formula', en: 'Science-Backed Formula' },
  'hero.title1':    { ru: 'Здоровый кишечник — фундамент',  uz: 'Sog\'lom ichak',           en: 'A healthy gut'         },
  'hero.title2':    { ru: 'вашей',                          uz: 'o\'zgartira oladi',        en: 'can change'            },
  'hero.title3':    { ru: 'жизни.',                         uz: 'hayotingizni.',            en: 'your life.'            },
  'hero.desc':      {
    ru: 'Наша миссия — создавать научно обоснованные решения для поддержки вашего пищеварения, энергии и долголетия.',
    uz: 'Mikrobiom — salomatliqingiz asosi. Formulamiz klinik jihatdan o\'rganilgan 50 milliard KOU probiotik shtammini to\'g\'ri joyiga yetkazadi.',
    en: 'Your microbiome is the foundation of your health. Our precision synbiotic formula delivers 50B AFU of clinically-studied probiotic strains — right where it counts.',
  },
  'hero.shopNow':   { ru: 'Купить сейчас', uz: 'Hozir sotib olish', en: 'Shop Now'      },
  'hero.quiz':      { ru: 'Посмотреть Рецепты', uz: 'Test o\'tish', en: 'Take the Quiz' },
  'hero.survival':  { ru: 'Выживаемость',  uz: 'Omon qolish',       en: 'Survival Rate' },
  'hero.reaches':   { ru: 'Достигает кишечника', uz: 'Ichakka yetadi', en: 'Reaches your gut' },

  // ── Stories ──
  'stories.title': {
    ru: 'Истории учёных, новаторов и таких же людей, как вы.',
    uz: 'Olimlar, novatorlar va siz kabi odamlarning hikoyalari.',
    en: 'Stories from scientists, innovators, and members like you.',
  },

  // ── Products ──
  'products.label':   { ru: 'Коллекция',       uz: 'Kolleksiya',        en: 'The Collection'    },
  'products.title1':  { ru: 'Здоровье всего',  uz: 'Butun tananing',    en: 'Whole body health' },
  'products.title2':  { ru: 'тела начинается', uz: 'salomatligi',       en: 'starts in the gut.' },
  'products.title3':  { ru: 'в кишечнике.',    uz: 'ichakdan boshlanadi.',en: ''                 },
  'products.desc':    {
    ru: 'Каждая формула создана с тщательно подобранными ингредиентами, протестирована независимыми лабораториями и подкреплена клиническими исследованиями.',
    uz: 'Har bir formula ehtiyotkorlik bilan tanlangan ingredientlar bilan yaratilgan, uchinchi tomonlar tomonidan sinovdan o\'tkazilgan va klinik tadqiqotlar bilan tasdiqlangan.',
    en: 'Every formula is crafted with precision-selected ingredients, third-party tested, and backed by clinical research.',
  },
  'products.viewAll':  { ru: 'Смотреть все продукты', uz: 'Barcha mahsulotlarni ko\'rish', en: 'View all products' },
  'products.shop':     { ru: 'Купить',                uz: 'Sotib olish',                  en: 'Shop'             },
  'products.perMonth': { ru: '/месяц',                uz: '/oy',                           en: '/month'           },

  // ── Science ──
  'science.label':    { ru: 'Наука',            uz: 'Fan',                en: 'The Science'            },
  'science.title1':   { ru: 'Большинство',      uz: 'Ko\'pgina',          en: 'Most probiotics'        },
  'science.title2':   { ru: 'пробиотиков не',   uz: 'probiotiklar hazm',  en: 'don\'t survive'         },
  'science.title3':   { ru: 'выживают при',     uz: 'qilishda omon',      en: 'digestion —'            },
  'science.title4':   { ru: 'пищеварении —',    uz: 'qolmaydi —',         en: ''                       },
  'science.titleGreen': { ru: 'наши выживают.', uz: 'biznikila qoladi.', en: 'ours do.'                },
  'science.desc':     {
    ru: 'Наша технология вложенных капсул защищает пробиотические штаммы от желудочной кислоты и желчных солей, доставляя 100% формулы в толстую кишку — туда, где она действительно работает.',
    uz: 'Bizning ichma-ich kapsul texnologiyamiz probiotik shtammlarni oshqozon kislotasi va o\'t tuzlaridan himoya qiladi, formulaning 100 foizini yo\'g\'on ichakka yetkazadi.',
    en: 'Our nested capsule technology shields probiotic strains through stomach acid and bile salts, delivering 100% of the formula to your colon — where it actually works.',
  },

  // ── Education ──
  'edu.label':    { ru: 'Микробиом человека', uz: 'Inson mikrobiomi',      en: 'The Human Microbiome' },
  'edu.title1':   { ru: 'Вы — больше',       uz: 'Siz insondan',          en: 'You are more'         },
  'edu.title2':   { ru: 'чем человек.',      uz: 'ko\'proqsiz.',           en: 'than human.'          },
  'edu.desc':     {
    ru: 'Ваше тело является домом для триллионов микроорганизмов, которые глубоко влияют на здоровье, настроение, иммунитет и даже экспрессию ДНК.',
    uz: 'Tanangiz salomatlik, kayfiyat, immunitet va hatto DNK ekspressiyasiga chuqur ta\'sir qiluvchi trillionlab mikroorganizmlarning uyidir.',
    en: 'Your body is home to trillions of microorganisms that profoundly influence your health, mood, immunity, and even your DNA expression.',
  },

  // ── Bundle ──
  'bundle.label':    { ru: 'Лучшая ценность',    uz: 'Eng yaxshi qiymat',    en: 'Best Value'           },
  'bundle.title':    { ru: 'Полная система',      uz: 'To\'liq tizim',         en: 'The Complete System'  },
  'bundle.nameGreen':{ ru: 'Дуэт',               uz: 'Juft',                  en: 'Duo'                  },
  'bundle.badge':    { ru: 'Сэкономьте 20% — Бандл', uz: '20% tejang — To\'plam', en: 'Save 20% — Bundle Offer' },
  'bundle.nameFull': { ru: 'Ежедневный набор',   uz: 'Kunlik to\'plam',        en: 'Daily Essentials'     },
  'bundle.desc':     {
    ru: 'Два наших самых популярных продукта в одном комплекте. Daily Synbiotic + Daily Multivitamin для полноценного питания и здоровья кишечника.',
    uz: 'Ikki eng ko\'p sotiladigan formulamiz birlashtirilgan. Daily Synbiotic + Daily Multivitamin — to\'liq kunlik ozuqa va ichak salomatligi uchun.',
    en: 'Our two best-selling formulas combined. Daily Synbiotic + Daily Multivitamin for complete daily nutrition and gut health.',
  },
  'bundle.cta':      { ru: 'Получить набор →',   uz: 'To\'plamni olish →',    en: 'Get the Bundle →'     },
  'bundle.save':     { ru: '/месяц · сэкономьте', uz: '/oy · tejash',         en: '/month · save'        },

  // ── Footer ──
  'footer.tagline':  {
    ru: 'Пионер науки о микробиоме для здоровья человека.',
    uz: 'Inson salomatligi uchun mikrobiom fanining peshqadami.',
    en: 'Pioneering microbiome science for human health.',
  },
  'footer.join':     {
    ru: 'Присоединяйтесь к 100 000+ людей, использующих NUMA для улучшения здоровья кишечника.',
    uz: '100 000+ kishilar NUMA dan foydalanib ichak sog\'ligini yaxshilayapti. Qo\'shiling!',
    en: 'Join 100,000+ people using Numa to transform their gut health and overall wellbeing.',
  },
  'footer.emailPlaceholder': { ru: 'Ваш email',    uz: 'Email manzilingiz', en: 'Your email address' },
  'footer.joinBtn':          { ru: 'Подписаться',  uz: 'Obuna bo\'lish',   en: 'Join'               },
  'footer.subscribed':       {
    ru: '✓ Вы подписаны! Добро пожаловать в сообщество NUMA.',
    uz: '✓ Obuna bo\'ldingiz! NUMA hamjamiyatiga xush kelibsiz.',
    en: '✓ You\'re in! Welcome to the Numa community.',
  },
  'footer.copy': { ru: '© 2026 NUMA Nutrition. Все права защищены.', uz: '© 2026 NUMA Nutrition. Barcha huquqlar himoyalangan.', en: '© 2026 Numa Nutrition, Inc. All rights reserved.' },
  'footer.carbon': { ru: 'Углеродно-нейтральная доставка', uz: 'Karbon-neytral yetkazib berish', en: 'Carbon neutral shipping' },

  // ── Catalog ──
  'catalog.title':     { ru: 'Каталог продуктов', uz: 'Mahsulotlar katalogi', en: 'Product Catalog'    },
  'catalog.subtitle':  {
    ru: 'Премиальные витамины и добавки для взрослых',
    uz: 'Kattalar uchun premium vitaminlar va qo\'shimchalar',
    en: 'Premium vitamins and supplements for adults',
  },
  'catalog.all':       { ru: 'Все',         uz: 'Hammasi',     en: 'All'        },
  'catalog.gut':       { ru: 'Кишечник',    uz: 'Ichak',       en: 'Gut Health' },
  'catalog.vitamins':  { ru: 'Витамины',    uz: 'Vitaminlar',  en: 'Vitamins'   },
  'catalog.energy':    { ru: 'Энергия',     uz: 'Energiya',    en: 'Energy'     },
  'catalog.sleep':     { ru: 'Сон',         uz: 'Uyqu',        en: 'Sleep'      },
  'catalog.immunity':  { ru: 'Иммунитет',   uz: 'Immunitet',   en: 'Immunity'   },
  'catalog.addToCart': { ru: 'В корзину',   uz: 'Savatga',     en: 'Add to Cart'},
  'catalog.inCart':    { ru: 'В корзине ✓', uz: 'Savatda ✓',   en: 'In Cart ✓'  },
  'catalog.monthly':   { ru: 'сум/мес',     uz: 'so\'m/oy',    en: 'UZS/mo'     },
  'catalog.perMonth':  { ru: '/месяц',      uz: '/oy',         en: '/month'     },
  'catalog.cart':      { ru: 'Корзина',     uz: 'Savat',       en: 'Cart'       },
  'catalog.cartEmpty': { ru: 'Корзина пуста', uz: 'Savat bo\'sh', en: 'Cart is empty' },
  'catalog.checkout':  { ru: 'Оформить заказ', uz: 'Buyurtma berish', en: 'Checkout' },
  'catalog.total':     { ru: 'Итого:',      uz: 'Jami:',       en: 'Total:'     },
  'catalog.remove':    { ru: 'Удалить',     uz: 'O\'chirish',  en: 'Remove'     },

  // ── Checkout ──
  'checkout.title':    { ru: 'Оформление заказа', uz: 'Buyurtmani rasmiylashtirish', en: 'Checkout'     },
  'checkout.name':     { ru: 'Имя и фамилия',     uz: 'Ism va familiya',             en: 'Full Name'    },
  'checkout.phone':    { ru: 'Телефон',            uz: 'Telefon',                     en: 'Phone'        },
  'checkout.address':  { ru: 'Адрес доставки',     uz: 'Yetkazib berish manzili',    en: 'Delivery Address' },
  'checkout.city':     { ru: 'Город',              uz: 'Shahar',                      en: 'City'         },
  'checkout.card':     { ru: 'Номер карты',         uz: 'Karta raqami',               en: 'Card Number'  },
  'checkout.expiry':   { ru: 'Срок действия',       uz: 'Amal qilish muddati',        en: 'Expiry'       },
  'checkout.cvv':      { ru: 'CVV',                 uz: 'CVV',                         en: 'CVV'          },
  'checkout.pay':      { ru: 'Оплатить',            uz: 'To\'lash',                    en: 'Pay Now'      },
  'checkout.success':  {
    ru: 'Заказ оформлен! Спасибо за покупку.',
    uz: 'Buyurtma rasmiylashtirildi! Xaridingiz uchun rahmat.',
    en: 'Order placed! Thank you for your purchase.',
  },
  'checkout.back':     { ru: 'Вернуться в каталог', uz: 'Katalogga qaytish', en: 'Back to Catalog' },
  'checkout.orderSummary': { ru: 'Ваш заказ', uz: 'Buyurtmangiz', en: 'Your Order' },

  // ── Blog ──
  'blog.title':     { ru: 'Блог о здоровье',    uz: 'Sog\'liq blogi',        en: 'Health Blog'       },
  'blog.subtitle':  {
    ru: 'Статьи о витаминах, микробиоме и здоровом образе жизни',
    uz: 'Vitaminlar, mikrobiom va sog\'lom turmush tarzi haqida maqolalar',
    en: 'Articles about vitamins, microbiome and healthy living',
  },
  'blog.readMore':  { ru: 'Читать далее',       uz: 'Ko\'proq o\'qish',      en: 'Read More'         },
  'blog.minRead':   { ru: 'мин. чтения',        uz: 'daqiqa o\'qish',        en: 'min read'          },
  'blog.backToBlog':{ ru: 'Назад к блогу',      uz: 'Blogga qaytish',        en: 'Back to Blog'      },
  'blog.allCats':   { ru: 'Все темы',           uz: 'Barcha mavzular',       en: 'All Topics'        },

  // ── Common ──
  'common.currency': { ru: 'сум', uz: 'so\'m', en: 'UZS' },
  'common.backHome': { ru: 'На главную', uz: 'Bosh sahifaga', en: 'Home' },
} as const

export type TranslationKey = keyof typeof translations
