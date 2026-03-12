export interface BlogPost {
  slug: string
  titleRu: string
  titleUz: string
  titleEn: string
  excerptRu: string
  excerptUz: string
  excerptEn: string
  bodyRu: string
  bodyUz: string
  bodyEn: string
  category: string
  date: string
  readTime: number
  gradient: [string, string]
  accentColor: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'gut-brain-axis',
    titleRu: 'Почему кишечник — это ваш второй мозг',
    titleUz: 'Nima uchun ichak ikkinchi miyangiz',
    titleEn: 'Why Your Gut is Your Second Brain',
    excerptRu: 'Ось кишечник-мозг — это двунаправленная коммуникационная магистраль между мозгом и микробиомом. Узнайте, как это влияет на настроение, тревогу и когнитивные способности.',
    excerptUz: 'Ichak-miya o\'qi — miya va mikrobiom o\'rtasidagi ikki tomonlama aloqa magistrali. Bu kayfiyat, tashvish va kognitiv qobiliyatlarga qanday ta\'sir qilishini bilib oling.',
    excerptEn: 'The gut-brain axis is a bidirectional communication highway between your brain and microbiome. Learn how this affects your mood, anxiety, and cognitive function.',
    bodyRu: `## Что такое ось кишечник-мозг?

Ваш кишечник и мозг постоянно общаются по сложной сети нервных волокон, гормонов и иммунных сигналов. Эта ось включает:

- **Блуждающий нерв** — главный канал связи, передающий сигналы от кишечника к мозгу
- **Энтерическую нервную систему** — «второй мозг» с более 500 млн нейронов
- **Микробные метаболиты** — вещества, производимые бактериями, которые влияют на работу мозга

## Влияние на настроение

95% серотонина — нейромедиатора счастья — производится именно в кишечнике. Дисбаланс микробиома напрямую связан с:

- Тревожными расстройствами
- Депрессией
- Хроническим стрессом
- Нарушениями сна

## Как NUMA помогает

Наши пробиотические формулы содержат штаммы *Lactobacillus rhamnosus* и *Bifidobacterium longum*, клинически доказанно снижающие тревожность и улучшающие настроение.

Регулярный приём Daily Synbiotic восстанавливает здоровый состав микробиома и поддерживает ось кишечник-мозг в оптимальном состоянии.`,
    bodyUz: `## Ichak-miya o'qi nima?

Ichak va miyangiz murakkab nerv tolalari, gormonlar va immunitet signallari tarmog'i orqali doimiy muloqot qiladi.

## Kayfiyatga ta'siri

Baxt neyromediatori serotonin 95% aynan ichakda ishlab chiqariladi. Mikrobiom buzilishi quyidagilarga to'g'ridan-to'g'ri bog'liq:

- Tashvish buzilishlari
- Depressiya
- Surunkali stress
- Uyqu buzilishlari

## NUMA qanday yordam beradi

Daily Synbiotic formulamiz tashvishni klinik jihatdan kamaytiradigan va kayfiyatni yaxshilaydigan probiotik shtammlarni o'z ichiga oladi.`,
    bodyEn: `## What is the Gut-Brain Axis?

Your gut and brain are in constant communication through a complex network of nerve fibers, hormones and immune signals. This axis includes:

- **The Vagus Nerve** — the main communication channel transmitting signals from gut to brain
- **The Enteric Nervous System** — the "second brain" with over 500 million neurons
- **Microbial Metabolites** — substances produced by bacteria that influence brain function

## Impact on Mood

95% of serotonin — the happiness neurotransmitter — is produced in the gut. Microbiome imbalance is directly linked to anxiety disorders, depression, chronic stress and sleep disturbances.

## How NUMA Helps

Our probiotic formulas contain *Lactobacillus rhamnosus* and *Bifidobacterium longum* strains, clinically proven to reduce anxiety and improve mood.`,
    category: 'Наука', date: '2026-03-01', readTime: 6,
    gradient: ['#0A0A0A', '#1a1a2e'], accentColor: '#D4D4F7',
  },
  {
    slug: 'vitamin-d-deficiency',
    titleRu: 'Дефицит витамина D в Узбекистане: почему это важно',
    titleUz: 'O\'zbekistonda D vitamini tanqisligi: nima uchun bu muhim',
    titleEn: 'Vitamin D Deficiency in Uzbekistan: Why It Matters',
    excerptRu: 'Несмотря на обилие солнца, многие жители Узбекистана страдают от дефицита витамина D. Узнайте о причинах, симптомах и решениях этой скрытой проблемы.',
    excerptUz: 'Quyosh mo\'lligiga qaramay, ko\'plab o\'zbekistonliklar D vitamini tanqisligidan aziyat chekadi. Bu yashirin muammoning sabablari, alomatlari va yechimlarini bilib oling.',
    excerptEn: 'Despite abundant sunshine, many Uzbekistan residents suffer from vitamin D deficiency. Learn about the causes, symptoms and solutions to this hidden problem.',
    bodyRu: `## Парадокс солнечного Узбекистана

Казалось бы, в стране с 300+ солнечными днями в году не должно быть дефицита витамина D. Однако исследования показывают, что до 70% населения имеют недостаточный уровень этого витамина.

## Причины дефицита

1. **Защита от солнца** — одежда, закрывающая кожу, и использование солнцезащитного крема
2. **Время суток** — большинство людей находятся в помещении в часы максимальной активности солнца
3. **Тёмный тон кожи** — требует больше времени на синтез витамина D
4. **Низкое потребление рыбы** — один из основных пищевых источников D3

## Последствия дефицита

- Усталость и слабость
- Боли в костях и мышцах
- Снижение иммунитета
- Депрессия и нарушения сна
- Риск остеопороза в долгосрочной перспективе

## Рекомендуемая дозировка

Для большинства взрослых оптимально 4000-5000 МЕ D3 в день в сочетании с витамином K2 для правильного усвоения кальция.

NUMA Vitamin D3+K2 содержит 5000 МЕ D3 и 100 мкг K2 в легко усваиваемой форме мягких гелевых капсул.`,
    bodyUz: `## Quyoshli O'zbekistoning paradoksi

Yiliga 300+ quyoshli kuni bo'lgan mamlakatda D vitamini tanqisligi bo'lmasligi kerak edi. Ammo tadqiqotlar aholining 70% gacha etarli darajada D vitamini yo'qligini ko'rsatmoqda.

## Tanqislik sabablari

1. Quyoshdan himoya — terini yopib qo'yadigan kiyim va quyosh kremidan foydalanish
2. Kun vaqti — ko'pchilik quyosh faoliyati eng yuqori vaqtda ichkaridalar
3. Teri tusi — D vitamini sintezi uchun ko'proq vaqt talab etadi

## NUMA D3+K2

5000 IU D3 va 100 mkg K2 — kaltsiyni to'g'ri o'zlashtirish uchun optimal kombinatsiya.`,
    bodyEn: `## The Sunny Uzbekistan Paradox

Despite 300+ sunny days per year, research shows up to 70% of the population has insufficient vitamin D levels.

## Causes of Deficiency

- Clothing that covers skin and sunscreen use
- Most people are indoors during peak sun hours
- Darker skin tone requires more time for vitamin D synthesis
- Low fish consumption (a main dietary source)

## NUMA D3+K2

Our 5000 IU D3 + 100 mcg K2 formula provides optimal support for bone health, immunity and mood regulation.`,
    category: 'Витамины', date: '2026-02-22', readTime: 5,
    gradient: ['#1a1200', '#3a2900'], accentColor: '#FFF3D4',
  },
  {
    slug: 'probiotics-vs-prebiotics',
    titleRu: 'Пробиотики vs Пребиотики: в чём разница?',
    titleUz: 'Probiotiklar vs Prebiotiklar: farq nima?',
    titleEn: 'Probiotics vs Prebiotics: What\'s the Difference?',
    excerptRu: 'Многие путают пробиотики и пребиотики. Разбираемся, как работает каждый компонент и почему синбиотик — это лучшее решение для здоровья кишечника.',
    excerptUz: 'Ko\'pchilik probiotik va prebiotikni adashtiradi. Har bir komponent qanday ishlashini va nima uchun sinbiotik ichak salomatligi uchun eng yaxshi yechim ekanligini tushuntiramiz.',
    excerptEn: 'Many confuse probiotics and prebiotics. Let\'s break down how each component works and why a synbiotic is the best solution for gut health.',
    bodyRu: `## Пробиотики: живые помощники

**Пробиотики** — это живые микроорганизмы, которые при правильном приёме приносят пользу здоровью хозяина. Они:

- Заселяют кишечник полезными бактериями
- Конкурируют с патогенными микроорганизмами
- Производят защитные вещества — бактериоцины

## Пребиотики: пища для бактерий

**Пребиотики** — это волокна, которые не перевариваются человеком, но служат питанием для полезных бактерий. Основные типы:

- Инулин
- Фруктоолигосахариды (ФОС)
- Галактоолигосахариды (ГОС)

## Синбиотик: лучшее из двух миров

**Синбиотик** объединяет пробиотики и пребиотики в одной формуле. Пребиотики создают оптимальную среду для выживания и размножения пробиотических штаммов — эффект синергии.

Daily Synbiotic от NUMA содержит 24 тщательно отобранных штамма + комплекс пребиотических волокон для максимального результата.`,
    bodyUz: `## Probiotiklar: tirik yordamchilar

Probiotiklar — to'g'ri qo'llanilganda xo'jayinning sog'lig'iga foyda keltiradigan tirik mikroorganizmlar.

## Prebiotiklar: bakteriyalar uchun ozuqa

Prebiotiklar — odam tomonidan hazm qilinmaydigan, lekin foydali bakteriyalar uchun ozuqa bo'lib xizmat qiladigan tolalar.

## Sinbiotik: ikki dunyoning eng yaxshisi

Sinbiotik probiotik va prebiotikni bitta formulada birlashtiradi. NUMA Daily Synbiotic 24 ta tanlangan shtamm + prebiotik tolalar kompleksini o'z ichiga oladi.`,
    bodyEn: `## Probiotics: Live Helpers

**Probiotics** are live microorganisms that, when administered in adequate amounts, confer a health benefit on the host. They colonize the gut, compete with pathogens, and produce protective substances.

## Prebiotics: Food for Bacteria

**Prebiotics** are fibers that humans can't digest but serve as food for beneficial bacteria — including inulin, FOS, and GOS.

## Synbiotics: The Best of Both Worlds

A **synbiotic** combines probiotics and prebiotics in one formula. NUMA Daily Synbiotic contains 24 carefully selected strains + a prebiotic fiber complex for maximum synergistic effect.`,
    category: 'Здоровье', date: '2026-02-15', readTime: 7,
    gradient: ['#0a1a0a', '#1a3a1a'], accentColor: '#D4F7D4',
  },
  {
    slug: 'omega-3-heart-health',
    titleRu: 'Omega-3 и здоровье сердца: что говорит наука',
    titleUz: 'Omega-3 va yurak salomatligi: fan nima deydi',
    titleEn: 'Omega-3 and Heart Health: What Science Says',
    excerptRu: 'Более 3000 исследований подтверждают пользу омега-3 жирных кислот для сердечно-сосудистой системы. Разбираем доказательства и оптимальные дозировки.',
    excerptUz: '3000 dan ortiq tadqiqot omega-3 yog\' kislotalarining yurak-qon tomir tizimi uchun foydaliligini tasdiqlaydi. Dalillarni va optimal dozalarni tahlil qilamiz.',
    excerptEn: 'Over 3,000 studies confirm the benefits of omega-3 fatty acids for cardiovascular health. We break down the evidence and optimal dosages.',
    bodyRu: `## EPA и DHA: ключевые жирные кислоты

Омега-3 включает несколько типов, но для здоровья сердца наиболее важны:

- **EPA (эйкозапентаеновая кислота)** — снижает воспаление и триглицериды
- **DHA (докозагексаеновая кислота)** — защищает клеточные мембраны

## Что доказывает наука

Мета-анализ 40 клинических исследований показал, что приём 2+ г EPA+DHA в день снижает:

- Риск сердечно-сосудистых событий на 25%
- Уровень триглицеридов на 15-30%
- Маркеры воспаления (CRP) на 20%

## Правила выбора добавки

При выборе Omega-3 обращайте внимание на:

1. Концентрацию EPA+DHA (не рыбьего жира в целом)
2. Степень очистки (IFOS сертификат)
3. Форму — триглицериды усваиваются лучше этиловых эфиров

NUMA Omega-3 содержит 2000 мг EPA+DHA с IFOS-сертификатом в форме натуральных триглицеридов.`,
    bodyUz: `## EPA va DHA: asosiy yog' kislotalari

Omega-3 bir necha turlarni o'z ichiga oladi, lekin yurak salomatligi uchun eng muhimlari: EPA — yallig'lanish va trigliseridlarni kamaytiradi, DHA — hujayra membranalarini himoya qiladi.

## Fan nima deydi

40 ta klinik tadqiqot meta-tahlili kuniga 2+ g EPA+DHA qabul qilish yurak-qon tomir hodisalari xavfini 25% ga kamaytirishi mumkinligini ko'rsatdi.

## NUMA Omega-3

2000 mg EPA+DHA, IFOS sertifikatiga ega, tabiiy trigliserid shaklida.`,
    bodyEn: `## EPA and DHA: Key Fatty Acids

Two omega-3s matter most for heart health: **EPA** — reduces inflammation and triglycerides; **DHA** — protects cell membranes.

## What the Science Shows

A meta-analysis of 40 clinical trials showed that taking 2+ g EPA+DHA daily reduces cardiovascular event risk by 25% and triglycerides by 15-30%.

## NUMA Omega-3

2000 mg EPA+DHA, IFOS-certified, in natural triglyceride form for superior absorption.`,
    category: 'Витамины', date: '2026-02-08', readTime: 8,
    gradient: ['#001a1a', '#003030'], accentColor: '#D4F0F7',
  },
  {
    slug: 'magnesium-stress-sleep',
    titleRu: 'Магний: минерал от стресса, усталости и бессонницы',
    titleUz: 'Magniy: stress, charchoq va uyqusizlikka qarshi mineral',
    titleEn: 'Magnesium: The Mineral for Stress, Fatigue and Insomnia',
    excerptRu: 'Магний участвует в более чем 300 биохимических реакциях организма. При этом до 80% взрослых потребляют его недостаточно. Узнайте, как это исправить.',
    excerptUz: 'Magniy organizmda 300 dan ortiq biokimyoviy reaksiyalarda ishtirok etadi. Biroq kattalarning 80% gacha uni etarli miqdorda iste\'mol qilmaydi.',
    excerptEn: 'Magnesium participates in over 300 biochemical reactions in the body. Yet up to 80% of adults consume insufficient amounts.',
    bodyRu: `## Признаки дефицита магния

Симптомы недостатка магния часто воспринимают как «обычную усталость»:

- Хроническая усталость
- Судороги мышц
- Раздражительность и тревожность
- Трудности с засыпанием
- Головные боли

## Роль магния в организме

Магний необходим для:

- **Производства АТФ** — главной молекулы энергии
- **Регуляции кортизола** — гормона стресса
- **Синтеза ГАМК** — тормозного нейромедиатора, способствующего расслаблению
- **Работы мышц** — расслабление после сокращения

## Какую форму выбрать?

| Форма | Биодоступность | Применение |
|-------|---------------|------------|
| Глицинат | Высокая | Сон, стресс |
| Малат | Высокая | Энергия, мышцы |
| Цитрат | Средняя | Общее |
| Оксид | Низкая | Не рекомендуем |

NUMA Magnesium Glycinate содержит 400 мг магния в форме глицината — наиболее биодоступной и безопасной форме.`,
    bodyUz: `## Magniy tanqisligining belgilari

- Surunkali charchoq
- Mushak tortishishi
- Asabiylashish va tashvish
- Uxlashda qiyinchilik
- Bosh og'riqlari

## NUMA Magniy Glitsinat

400 mg magniy glitsinat shaklida — eng yuqori bioelektivlik va xavfsizlik bilan.`,
    bodyEn: `## Signs of Magnesium Deficiency

- Chronic fatigue and muscle cramps
- Irritability and anxiety
- Difficulty falling asleep
- Headaches and tension

## Why Glycinate Form?

Magnesium glycinate has the highest bioavailability and doesn't cause digestive upset. NUMA Magnesium Glycinate delivers 400mg in this optimal form.`,
    category: 'Сон', date: '2026-01-28', readTime: 6,
    gradient: ['#0a001a', '#1a0030'], accentColor: '#E8D4F7',
  },
  {
    slug: 'collagen-after-30',
    titleRu: 'Коллаген после 30: почему нужно начинать сейчас',
    titleUz: '30 yoshdan keyin kollagen: nima uchun hoziroq boshlash kerak',
    titleEn: 'Collagen After 30: Why You Need to Start Now',
    excerptRu: 'После 30 лет выработка коллагена снижается на 1-2% в год. Узнайте, как поддержать молодость кожи, здоровье суставов и кишечника с помощью правильных добавок.',
    excerptUz: '30 yoshdan keyin kollagen ishlab chiqarish yiliga 1-2% ga kamayadi. To\'g\'ri qo\'shimchalar yordamida teri yoshligini, bo\'g\'imlar va ichak sog\'lig\'ini qanday saqlashni bilib oling.',
    excerptEn: 'After age 30, collagen production decreases by 1-2% per year. Learn how to support skin youth, joint health and gut integrity with the right supplements.',
    bodyRu: `## Что такое коллаген и почему он важен?

Коллаген — самый распространённый белок в организме (30% от всех белков). Он составляет основу:

- Кожи — упругость и гидратация
- Суставов — хрящ и синовиальная жидкость
- Кишечника — целостность слизистой оболочки
- Волос и ногтей

## Что происходит после 30?

С возрастом:

- Снижается синтез нового коллагена
- Ускоряется распад существующего
- Качество коллагеновых волокон ухудшается

Результат: морщины, боли в суставах, истончение волос, проблемы с «дырявым кишечником».

## Гидролизованный коллаген: как это работает

Гидролизованный коллаген расщеплён на короткие пептиды, которые:

1. Легко всасываются в кровь
2. Стимулируют фибробласты производить новый коллаген
3. Достигают кожи, суставов и кишечника

NUMA Collagen Peptides содержит коллаген I и III типов из проверенных источников, 20 г на порцию.`,
    bodyUz: `## Kollagen nima va nima uchun muhim?

Kollagen organizmda eng ko'p tarqalgan oqsil (barcha oqsillarning 30%). U teri, bo'g'imlar, ichak va sochning asosini tashkil etadi.

## 30 yoshdan keyin nima bo'ladi?

- Yangi kollagen sintezi kamayadi
- Mavjud kollagen parchalanishi tezlashadi

## NUMA Kollagen Peptidlar

I va III turdagi kollagen peptidlari, porsiyaga 20 g — teri, bo'g'imlar va ichak salomatligi uchun.`,
    bodyEn: `## What is Collagen and Why Does It Matter?

Collagen is the most abundant protein in the body (30% of all proteins), forming the foundation of skin, joints, gut and hair.

## What Happens After 30?

Collagen synthesis slows while breakdown accelerates, leading to wrinkles, joint discomfort, thinning hair, and compromised gut integrity.

## NUMA Collagen Peptides

Hydrolyzed Type I & III collagen, 20g per serving — easily absorbed and clinically shown to stimulate new collagen production.`,
    category: 'Красота', date: '2026-01-15', readTime: 5,
    gradient: ['#1a000a', '#3a001a'], accentColor: '#F7D4E8',
  },
  {
    slug: 'how-to-take-vitamins',
    titleRu: 'Как правильно принимать витамины: полное руководство',
    titleUz: 'Vitaminlarni qanday to\'g\'ri qabul qilish: to\'liq qo\'llanma',
    titleEn: 'How to Take Vitamins Correctly: A Complete Guide',
    excerptRu: 'Правильное время приёма и сочетания витаминов влияют на их эффективность не меньше, чем дозировка. Разбираемся во всех нюансах.',
    excerptUz: 'Vitaminlarni qabul qilishning to\'g\'ri vaqti va kombinatsiyalari ularning samaradorligiga dozadan ko\'ra kam ta\'sir qilmaydi.',
    excerptEn: 'The right timing and combinations of vitamins affect their effectiveness just as much as dosage. Let\'s break down all the nuances.',
    bodyRu: `## Жирорастворимые vs водорастворимые

**Жирорастворимые** (A, D, E, K):
- Принимать с едой, содержащей жиры
- Накапливаются в организме — не нужно принимать каждый день
- D3+K2: утром с завтраком, содержащим авокадо или орехи

**Водорастворимые** (C, B-группа):
- Лучше усваиваются натощак
- Не накапливаются — нужен регулярный приём
- B-комплекс: утром для энергии на весь день

## Пробиотики: когда принимать?

Лучше всего — за 30 минут до еды или с едой. Не принимайте с горячими напитками — это убивает бактерии.

## Магний: вечером для лучшего сна

Магний расслабляет нервную систему. Оптимальное время — за 1-2 часа до сна.

## Omega-3: с едой для лучшего усвоения

Рыбий жир усваивается лучше с жирной едой и меньше вызывает «рыбную отрыжку».

## Важные синергии

- D3 + K2 + Магний = максимальное здоровье костей
- Omega-3 + D3 = противовоспалительный эффект
- Probiotics + Prebiotics = синбиотическая поддержка`,
    bodyUz: `## Yog'da eriydigan va suvda eriydigan

**Yog'da eriydigan** (A, D, E, K): yog' o'z ichiga olgan ovqat bilan qabul qiling.

**Suvda eriydigan** (C, B-guruh): och qoringa yaxshiroq o'zlashtiriladi.

## Probiotiklar qachon?

Ovqatdan 30 daqiqa oldin yoki ovqat bilan. Issiq ichimliklar bilan qabul qilmang.

## Magniy: uyqu uchun kechqurun

Magniy asab tizimini tinchlantiradi. Uyqudan 1-2 soat oldin qabul qiling.`,
    bodyEn: `## Fat-Soluble vs Water-Soluble

**Fat-soluble** (A, D, E, K): take with fatty food for optimal absorption.
**Water-soluble** (C, B vitamins): best absorbed on empty stomach.

## Key Timing Rules

- **Probiotics**: 30 min before meals or with food (not hot drinks)
- **Magnesium**: 1-2 hours before bed for sleep support
- **Omega-3**: with fatty meals to reduce "fish burps"
- **B-Complex**: morning for all-day energy
- **D3+K2**: with fatty breakfast`,
    category: 'Советы', date: '2026-01-05', readTime: 9,
    gradient: ['#001a0a', '#003a1a'], accentColor: '#D4F7E0',
  },
  {
    slug: 'ashwagandha-adaptogen',
    titleRu: 'Ашваганда: адаптоген для современного ритма жизни',
    titleUz: 'Ashwagandha: zamonaviy hayot ritmi uchun adaptogen',
    titleEn: 'Ashwagandha: The Adaptogen for Modern Life',
    excerptRu: 'Ашваганда KSM-66 — самый изученный адаптоген с более чем 20 клиническими исследованиями. Как он снижает кортизол, улучшает выносливость и качество сна?',
    excerptUz: 'Ashwagandha KSM-66 — 20 dan ortiq klinik tadqiqotga ega eng ko\'p o\'rganilgan adaptogen. U kortizolni qanday kamaytiradi, chidamlilikni oshiradi va uyqu sifatini yaxshilaydi?',
    excerptEn: 'Ashwagandha KSM-66 is the most studied adaptogen with over 20 clinical trials. How does it reduce cortisol, improve endurance and sleep quality?',
    bodyRu: `## Что такое адаптоген?

Адаптогены — растения, помогающие организму адаптироваться к стрессу. Ашваганда (Withania somnifera) — аюрведическое растение, используемое 3000+ лет.

## KSM-66: золотой стандарт

KSM-66 — запатентованный экстракт ашваганды с наибольшей доказательной базой. Клинически подтверждённые эффекты:

### Снижение стресса и тревоги
- Снижение кортизола на 27.9%
- Снижение индекса стресса PSS на 44%

### Улучшение физической формы
- Увеличение VO2max у спортсменов
- Ускорение восстановления после тренировок
- Повышение тестостерона у мужчин на 14.7%

### Качество сна
- Улучшение качества сна на 72%
- Сокращение времени засыпания

## Дозировка и курс

Рекомендуемая дозировка: 600 мг KSM-66 в день. Эффект развивается постепенно — оптимально принимать 60-90 дней.

NUMA Ashwagandha содержит 600 мг стандартизированного экстракта KSM-66.`,
    bodyUz: `## Adaptogen nima?

Adaptogenlar — organizmni stressga moslashishiga yordam beradigan o'simliklar. Ashwagandha (Withania somnifera) — 3000+ yil davomida ishlatiladigan Ayurveda o'simligi.

## KSM-66: oltin standart

KSM-66 — patentlangan ashwagandha ekstrakti. Klinik jihatdan tasdiqlangan ta'sirlar:
- Kortizolni 27,9% ga kamaytirish
- Stress indeksini 44% ga kamaytirish
- Uyqu sifatini 72% ga yaxshilash

## NUMA Ashwagandha

600 mg standartlashtirilgan KSM-66 ekstrakti.`,
    bodyEn: `## What is an Adaptogen?

Adaptogens are plants that help the body adapt to stress. Ashwagandha (Withania somnifera) has been used in Ayurvedic medicine for 3000+ years.

## KSM-66: The Gold Standard

KSM-66 is the most clinically studied ashwagandha extract, with proven effects including:
- 27.9% cortisol reduction
- 44% reduction in PSS stress index
- 72% improvement in sleep quality
- 14.7% increase in testosterone in men

## NUMA Ashwagandha KSM-66

600mg standardized KSM-66 extract per capsule — the clinically effective dose.`,
    category: 'Энергия', date: '2025-12-20', readTime: 7,
    gradient: ['#1a1000', '#3a2500'], accentColor: '#F7ECD4',
  },
]
