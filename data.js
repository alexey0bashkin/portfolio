// ============================================
//  ВСЁ СОДЕРЖИМОЕ САЙТА ЗДЕСЬ.
//  Меняй текст, проекты, навыки — и сайт обновится.
// ============================================

const SITE_DATA = {

  // ----- SEO / мета -----
  seo: {
    title: "Алексей Башкин — Python-разработчик · Автоматизация · ETL",
    description: "Python-разработчик с 4+ годами опыта: автоматизация, ETL-пайплайны, парсинг, REST API. Сокращаю ручную работу с данными на 97% — от прототипа до продакшена."
  },

  // ----- Hero -----
  hero: {
    name: "Алексей Башкин",
    role: "Python-разработчик · Автоматизация · Данные",
    tagline: "Превращаю ручную рутину в надёжные скрипты и ETL-пайплайны — до 97% быстрее, от прототипа до продакшена.",
    location: "Москва, Россия",
    availability: "Открыт к предложениям · full-time / проекты",
    highlights: [
      "4+ года в автоматизации",
      "2 млн+ записей в день",
      "ETL · API · Парсинг",
      "FastAPI · Pandas · Docker"
    ],
    buttons: {
      projects: "Смотреть проекты",
      resume: "Скачать резюме"
    },
    photos: [
      "assets/photo.jpg",
      "assets/photo-2.jpg",
      "assets/photo-3.jpg"
    ]
  },

  // ----- About -----
  about: {
    title: "О себе",
    text: `Python-разработчик с 4+ годами опыта в автоматизации, ETL и интеграциях. Специализируюсь на высокопроизводительных скриптах для обработки больших данных, парсинга и построения ETL-пайплайнов.

Работал с объёмами 2+ млн записей в день и бюджетами до 500 млн ₽ в месяц. Уверенно владею Python (Pandas, NumPy, BeautifulSoup, Selenium), SQL, Git, Docker и REST API.

Открыт к позиции в продуктовой команде, где навыки автоматизации и работы с данными помогают решать бизнес-задачи — быстро, измеримо и надёжно.`,
    principles: [
      {
        title: "Измеримый результат",
        text: "Каждая автоматизация — с метрикой до/после: время, объём, экономия."
      },
      {
        title: "Надёжность",
        text: "Обработка ошибок, логирование и тесты — часть пайплайна, а не «потом»."
      },
      {
        title: "Прозрачность",
        text: "Понятный код, документация и воспроизводимое окружение (Docker)."
      }
    ],
    stats: [
      { value: 4,   suffix: "+",     label: "года опыта" },
      { value: 5,   suffix: "",      label: "клиентов · автоматизация под ключ" },
      { value: 97,  suffix: "%",     label: "ускорение обработки данных" },
      { value: 2,   suffix: " млн+", label: "записей в день" }
    ]
  },

  // ----- Projects -----
  projects: {
    title: "Избранные проекты",
    items: [
      {
        name: "Сверка банковских транзакций (БАНК ↔ ЦОД)",
        year: "2025",
        description: "Приложение для поиска расхождений: пропуски, дубли, сбои. Автоотмена, поиск записей «есть в банке, нет в ЦОД» и наоборот, срыв записи, ЦОД без КА. Формирование Excel-отчёта.",
        result: "Сократил время сверки с нескольких часов до < 1 минуты для 150k+ записей.",
        metrics: [
          { value: "< 1 мин", label: "время сверки" },
          { value: "150k+",   label: "записей за прогон" },
          { value: "−98%",    label: "ручного труда" }
        ],
        stack: ["Python", "CSV", "openpyxl", "Regex", "GUI"],
        links: { demo: null, github: null },
        image: "assets/project-bank.JPG",
        featured: true
      },
      {
        name: "ETL-пайплайн для Московского метрополитена",
        year: "2025",
        description: "Автоматизация еженедельной отчётности: обработка пассажиропотока и выручки, интеграция с Excel-шаблонами, формирование отчётов для руководства.",
        result: "Сократил время подготовки отчётов на 30% при 2+ млн поездок/день и выручке до 500 млн ₽/мес.",
        metrics: [
          { value: "−30%",   label: "время отчётности" },
          { value: "2 млн+", label: "поездок в день" },
          { value: "500 млн",label: "₽ выручки / мес" }
        ],
        stack: ["Python", "Pandas", "Excel", "Git"],
        links: { demo: null, github: null },
        image: "assets/project-metro.JPG",
        featured: false
      },
      {
        name: "REST API для интеграции с внешними системами",
        year: "2024",
        description: "Проектирование и разработка API для автоматического обмена данными между системами. Контейнеризация, документация.",
        result: "Автоматизировал обмен данными для 5 клиентов.",
        metrics: [
          { value: "5",    label: "клиентов" },
          { value: "100%", label: "обмен автоматизирован" },
          { value: "1",    label: "Docker-образ" }
        ],
        stack: ["Python", "FastAPI", "Docker", "REST"],
        links: { demo: null, github: null },
        image: "assets/project-api.png",
        featured: false
      },
      {
        name: "Гибридная интеллектуальная система автодиагностики",
        year: "2025 — 2026",
        description: "ВКР магистратуры (в разработке). Система диагностики неисправностей легковых автомобилей на основе гибридного подхода: экспертные правила + ML-модели. Включает веб-интерфейс и API.",
        result: "Гибрид правил и машинного обучения для точной диагностики.",
        metrics: [
          { value: "Правила + ML", label: "гибридный подход" },
          { value: "Web + API",    label: "интерфейсы" }
        ],
        stack: ["Python", "ML", "Экспертные правила", "FastAPI", "Web"],
        links: {
          demo: "https://autodiagtech.cloudpub.ru/",
          github: "https://github.com/alexey0bashkin/HybridAutoDiag"
        },
        image: "assets/project-autodiag.png",
        featured: true
      }
    ]
  },

  // ----- Experience -----
  experience: {
    title: "Опыт работы",
    items: [
      {
        period: "Ноябрь 2026 — настоящее время",
        company: "ГосТех",
        role: "Инженер по автоматизации данных · Отдел сопровождения заказа",
        description: "Автоматизация процессов сопровождения заказов, разработка скриптов и интеграций.",
        stack: ["Python", "SQL", "REST API"],
        achievements: [
          "Разрабатываю скрипты и интеграции для автоматизации сопровождения заказов.",
          "Снижаю долю ручных операций за счёт Python-автоматизации и работы с SQL."
        ]
      },
      {
        period: "Август 2025 — Январь 2026",
        company: "Московский метрополитен",
        role: "Главный специалист · Служба сбора доходов",
        description: "Автоматизация отчётности и обработка больших данных по пассажиропотоку и выручке.",
        stack: ["Python", "Pandas", "Excel", "Git"],
        achievements: [
          "Сократил время подготовки еженедельной отчётности на 30% при 2+ млн поездок/день и выручке до 500 млн ₽/мес.",
          "Построил ETL-пайплайн с автоматической выгрузкой в Excel-отчёты.",
          "Оптимизировал Excel-шаблоны и внедрил Python-скрипты, исключив ручной труд."
        ]
      },
      {
        period: "Сентябрь 2022 — настоящее время",
        company: "Freelance / Самозанятость",
        role: "Python-разработчик · Автоматизатор",
        description: "Проекты под ключ: от сбора требований до внедрения. Автоматизация, ETL, парсинг, API, BI-дашборды.",
        stack: ["Python", "FastAPI", "Pandas", "BeautifulSoup", "Selenium", "Power BI"],
        achievements: [
          "Автоматизировал обработку отчётности для 5 клиентов: сократил цикл с 1 дня до 20 минут (−97%).",
          "Разработал REST API на FastAPI для интеграции с внешними сервисами.",
          "Построил ETL-процессы на Pandas для сбора и очистки данных из Excel и веб-источников.",
          "Преподавал Python, алгоритмы и базы данных на курсах и в формате менторства."
        ]
      }
    ]
  },

  // ----- Skills -----
  skills: {
    title: "Навыки",
    groups: [
      {
        name: "Языки и данные",
        items: [
          { name: "Python",    level: 5 },
          { name: "Pandas",    level: 5 },
          { name: "NumPy",     level: 4 },
          { name: "SQL",       level: 4 },
          { name: "Excel",     level: 5 },
          { name: "VBA",       level: 3 }
        ]
      },
      {
        name: "Web и API",
        items: [
          { name: "FastAPI",         level: 5 },
          { name: "REST API",        level: 5 },
          { name: "BeautifulSoup",   level: 4 },
          { name: "Selenium",        level: 4 },
          { name: "Web Scraping",    level: 5 }
        ]
      },
      {
        name: "Инфраструктура",
        items: [
          { name: "Git",   level: 5 },
          { name: "Docker",level: 4 },
          { name: "CI/CD", level: 3 }
        ]
      },
      {
        name: "BI и анализ",
        items: [
          { name: "Power BI",                         level: 4 },
          { name: "ETL-процессы",                     level: 5 },
          { name: "Визуализация данных",              level: 4 },
          { name: "Обработка больших объёмов данных", level: 4 }
        ]
      },
      {
        name: "Моделирование",
        items: [
          { name: "BPMN 2.0", level: 4 },
          { name: "UML",      level: 4 },
          { name: "OpenAPI",  level: 4 },
          { name: "Swagger",  level: 4 },
          { name: "PlantUML", level: 3 }
        ]
      }
    ]
  },

  // ----- Education -----
  education: {
    title: "Образование",
    items: [
      {
        period: "2025 — 2027",
        type: "Магистратура",
        institution: "РГГУ, Москва",
        degree: "Управление данными и знаниями в компьютерных сетях",
        description: "Институт информационных наук и технологий безопасности."
      },
      {
        period: "2021 — 2025",
        type: "Бакалавриат",
        institution: "РГГУ, Москва",
        degree: "Прикладная информатика",
        description: "Институт информационных наук и технологий безопасности."
      }
    ],
    courses: [
      "2024 — Численные методы решения прикладных задач (РГГУ)",
      "2023 — Достижения и проблемы технологий наноэлектроники (РГГУ)"
    ]
  },

  // ----- Contacts -----
  contacts: {
    title: "Контакты",
    subtitle: "Открыт к предложениям. Пишите в удобный мессенджер или на почту.",
    location: "Москва, Россия (UTC+3)",
    preferred: "Telegram",
    items: [
      { label: "Email",    value: "alexey0bashkin@yandex.ru", link: "mailto:alexey0bashkin@yandex.ru", icon: "mail" },
      { label: "Telegram", value: "@Al0_B",                   link: "https://t.me/Al0_B",                 icon: "telegram" },
      { label: "MAX",      value: "Написать в MAX",           link: "https://max.ru/u/f9LHodD0cOL2zEY8itoqutYI4ax2nj22N6t6E-iI6QEkVzypE0cyr1tQjv4", icon: "message" },
      { label: "GitHub",   value: "alexey0bashkin",           link: "https://github.com/alexey0bashkin",  icon: "github" }
    ],
    resumePath: "assets/resume.pdf"
  }
};