import fs from 'fs-extra';
import path from 'path';

// 定義圖片目錄和 JSON 文件路徑
const SLIDES_DIR = './public/slides';
const DATA_DIR = './data';
const CATEGORIES_JSON = path.join(DATA_DIR, 'categories.json');
const EVENTS_JSON = path.join(DATA_DIR, 'events.json');
const SLIDES_JSON = path.join(DATA_DIR, 'slides.json');

// 確保 data 目錄存在
fs.ensureDirSync(DATA_DIR);

// 初始化數據結構
let categories = [
  {
    id: 'all',
    name: 'All',
    icon: '/assets/all.svg',
  },
];
let events = [];
let slides = {};

// 解析文件名的函數
function parseFileName(fileName) {
  const parts = fileName.replace('.webp', '').split('-');
  return {
    event: parts[0]
      .replace(/[\[\]]/g, '')
      .toLowerCase()
      .replace(/ /g, '-'),
    category: parts[1]
      .replace(/[\[\]]/g, '')
      .toLowerCase()
      .replace(/ /g, '-'),
    title: parts[2].replace(/[\[\]]/g, ''),
  };
}

// 格式化事件名稱的函數
function formatEventName(eventId) {
  const words = eventId.split('-');
  return words
    .map((word) => {
      if (word.toLowerCase() === 'wwdc') {
        return 'WWDC';
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

// 格式化類別名稱的函數
function formatCategoryName(categoryId) {
  return categoryId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// 从事件名称中提取年份和月份
function extractDateInfo(eventName) {
  const monthMap = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
  };
  const match = eventName
    .toLowerCase()
    .replace('wwdc', 'wwdc ')
    .match(/(\w+)\s+(\d{4})/);
  if (match) {
    const month = monthMap[match[1]] || 0;
    const year = parseInt(match[2]);
    return { year, month };
  }
  return { year: 0, month: 0 };
}

// 掃描圖片目錄
fs.readdirSync(SLIDES_DIR).forEach((file) => {
  if (path.extname(file) === '.webp') {
    const { event, category, title } = parseFileName(file);

    // 更新 events
    if (!events.find((e) => e.id === event)) {
      const eventName = formatEventName(event);
      events.push({
        id: event,
        name: eventName,
        image: `/assets/${eventName}.webp`, // 使用格式化後的事件名稱
        categories: ['all', category], // 添加 'all' 類別
      });
    } else {
      const existingEvent = events.find((e) => e.id === event);
      if (!existingEvent.categories.includes(category)) {
        existingEvent.categories.push(category);
      }
    }

    // 更新 categories
    if (!categories.find((c) => c.id === category)) {
      const categoryName = formatCategoryName(category);
      categories.push({
        id: category,
        name: categoryName,
        icon: `/assets/${categoryName}.svg`, // 使用格式化後的類別名稱
      });
    }

    // 更新 slides
    if (!slides[event]) {
      slides[event] = [];
    }
    if (!slides[event].find((s) => s.id === `${event}-${category}-${title.toLowerCase().replace(/ /g, '-')}`)) {
      slides[event].push({
        id: `${event}-${category}-${title.toLowerCase().replace(/ /g, '-')}`,
        title: title,
        image: `/slides/${file}`,
        category: category,
      });
    }
  }
});

// 按年份和月份降序排序 events
events.sort((a, b) => {
  const dateA = extractDateInfo(a.name);
  const dateB = extractDateInfo(b.name);
  if (dateA.year !== dateB.year) {
    return dateB.year - dateA.year;
  }
  return dateB.month - dateA.month;
});

// 对 slides 对象进行排序
const sortedSlides = {};
Object.keys(slides)
  .sort((eventA, eventB) => {
    const dateA = extractDateInfo(eventA);
    const dateB = extractDateInfo(eventB);
    if (dateA.year !== dateB.year) {
      return dateB.year - dateA.year;
    }
    return dateB.month - dateA.month;
  })
  .forEach((event) => {
    // 对每个事件的幻灯片数组进行排序
    sortedSlides[event] = slides[event].sort((a, b) => {
      // 这里可以根据需要定义幻灯片的排序逻辑
      // 例如，按照类别字母顺序排序
      return a.category.localeCompare(b.category);
    });
  });

// 寫入生成的 JSON 文件
fs.writeJsonSync(CATEGORIES_JSON, categories, { spaces: 4 });
fs.writeJsonSync(EVENTS_JSON, events, { spaces: 4 });
fs.writeJsonSync(SLIDES_JSON, sortedSlides, { spaces: 4 });

console.log('JSON files have been generated successfully.');
