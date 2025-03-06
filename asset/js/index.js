import { pokemonData } from '../data.js';
const fs = require('fs');

// 紀錄卡包與稀有度
let allPack = ['mewtwo','pikachu','charizard','a1','mew','dialga','palkia','a2'];
let allRarity = ['1s','2s','3s','4s','1g','2g','3g','1c'];
//卡包名稱中英文轉換
const packDisplayName = (packName) => {
  switch(packName) {
    case 'mewtwo':
      return '超夢';
    case 'pikachu':
      return '皮卡丘';
    case 'charizard':
      return '噴火龍';
    case 'a1':
      return 'A1包普池';
    case 'mew':
      return '幻遊島';
    case 'dialga':
      return '帝牙盧卡';
    case 'palkia':
      return '帕路奇亞';
    case 'a2':
      return 'A2包普池';
    default:
      return '';
  }
};
// 計算各卡包卡牌總數/擁有數
let packAllCount = {
  mewtwoAllCount: 0,
  pikachuAllCount: 0,
  charizardAllCount: 0,
  a1AllCount: 0 ,
  mewAllCount: 0,
  dialgaAllCount: 0,
  palkiaAllCount: 0,
  a2AllCount: 0
};
let cardOwnCount = {
  mewtwoOwnCount: 0,
  pikachuOwnCount: 0,
  charizardOwnCount: 0,
  a1OwnCount: 0,
  mewOwnCount: 0,
  dialgaOwnCount: 0,
  palkiaOwnCount: 0,
  a2OwnCount: 0
};
//計算各卡包的稀有度/擁有數
let packAllRarityCount = {
  mewtwoAll1s: 0,
  mewtwoAll2s: 0,
  mewtwoAll3s: 0,
  mewtwoAll4s: 0,
  mewtwoAll1g: 0,
  mewtwoAll2g: 0,
  mewtwoAll3g: 0,
  mewtwoAll1c: 0,
  pikachuAll1s: 0,
  pikachuAll2s: 0,
  pikachuAll3s: 0,
  pikachuAll4s: 0,
  pikachuAll1g: 0,
  pikachuAll2g: 0,
  pikachuAll3g: 0,
  pikachuAll1c: 0,
  charizardAll1s: 0,
  charizardAll2s: 0,
  charizardAll3s: 0,
  charizardAll4s: 0,
  charizardAll1g: 0,
  charizardAll2g: 0,
  charizardAll3g: 0,
  charizardAll1c: 0,
  a1All1s: 0,
  a1All2s: 0,
  a1All3s: 0,
  a1All4s: 0,
  a1All1g: 0,
  a1All2g: 0,
  a1All3g: 0,
  a1All1c: 0,
  mewAll1s: 0,
  mewAll2s: 0,
  mewAll3s: 0,
  mewAll4s: 0,
  mewAll1g: 0,
  mewAll2g: 0,
  mewAll3g: 0,
  mewAll1c: 0,
  dialgaAll1s: 0,
  dialgaAll2s: 0,
  dialgaAll3s: 0,
  dialgaAll4s: 0,
  dialgaAll1g: 0,
  dialgaAll2g: 0,
  dialgaAll3g: 0,
  dialgaAll1c: 0,
  palkiaAll1s: 0,
  palkiaAll2s: 0,
  palkiaAll3s: 0,
  palkiaAll4s: 0,
  palkiaAll1g: 0,
  palkiaAll2g: 0,
  palkiaAll3g: 0,
  palkiaAll1c: 0,
  a2All1s: 0,
  a2All2s: 0,
  a2All3s: 0,
  a2All4s: 0,
  a2All1g: 0,
  a2All2g: 0,
  a2All3g: 0,
  a2All1c: 0
};
let cardOwnRarityCount = {
  mewtwoOwn1s: 0,
  mewtwoOwn2s: 0,
  mewtwoOwn3s: 0,
  mewtwoOwn4s: 0,
  mewtwoOwn1g: 0,
  mewtwoOwn2g: 0,
  mewtwoOwn3g: 0,
  mewtwoOwn1c: 0,
  pikachuOwn1s: 0,
  pikachuOwn2s: 0,
  pikachuOwn3s: 0,
  pikachuOwn4s: 0,
  pikachuOwn1g: 0,
  pikachuOwn2g: 0,
  pikachuOwn3g: 0,
  pikachuOwn1c: 0,
  charizardOwn1s: 0,
  charizardOwn2s: 0,
  charizardOwn3s: 0,
  charizardOwn4s: 0,
  charizardOwn1g: 0,
  charizardOwn2g: 0,
  charizardOwn3g: 0,
  charizardOwn1c: 0,
  a1Own1s: 0,
  a1Own2s: 0,
  a1Own3s: 0,
  a1Own4s: 0,
  a1Own1g: 0,
  a1Own2g: 0,
  a1Own3g: 0,
  a1Own1c: 0,
  mewOwn1s: 0,
  mewOwn2s: 0,
  mewOwn3s: 0,
  mewOwn4s: 0,
  mewOwn1g: 0,
  mewOwn2g: 0,
  mewOwn3g: 0,
  mewOwn1c: 0,
  dialgaOwn1s: 0,
  dialgaOwn2s: 0,
  dialgaOwn3s: 0,
  dialgaOwn4s: 0,
  dialgaOwn1g: 0,
  dialgaOwn2g: 0,
  dialgaOwn3g: 0,
  dialgaOwn1c: 0,
  palkiaOwn1s: 0,
  palkiaOwn2s: 0,
  palkiaOwn3s: 0,
  palkiaOwn4s: 0,
  palkiaOwn1g: 0,
  palkiaOwn2g: 0,
  palkiaOwn3g: 0,
  palkiaOwn1c: 0,
  a2Own1s: 0,
  a2Own2s: 0,
  a2Own3s: 0,
  a2Own4s: 0,
  a2Own1g: 0,
  a2Own2g: 0,
  a2Own3g: 0,
  a2Own1c: 0
};


//辨識卡牌來自哪個卡包以及哪個稀有度，以此++或--
const cardIdent = (obj,allORown,pluORsub) => { 
  //各別卡包總卡數計算
  if(allORown=="all")packAllCount[`${obj.pack}AllCount`]++;
  //各別卡包擁有卡數計算
  if(allORown=="own"&&pluORsub=="plu"){
    cardOwnCount[`${obj.pack}OwnCount`]++;
  }else if(allORown=="own"&&pluORsub=="sub"){
    cardOwnCount[`${obj.pack}OwnCount`]--;
  }
  //各別卡包各別稀有度總計算
  if(allORown=="all")packAllRarityCount[`${obj.pack}All${obj.rarity}`]++;
  //各別卡包各別稀有度擁有計算
  if(allORown=="own"&&pluORsub=="plu"){
    cardOwnRarityCount[`${obj.pack}Own${obj.rarity}`]++;
  }else if(allORown=="own"&&pluORsub=="sub"){
    cardOwnRarityCount[`${obj.pack}Own${obj.rarity}`]--;
  }
};



document.getElementById('filterMewtwo').addEventListener('click', () => {
  filterPokemonData('mewtwo');
});
document.getElementById('filterPikachu').addEventListener('click', () => {
  filterPokemonData('pikachu');
});
document.getElementById('filterCharizard').addEventListener('click', () => {
  filterPokemonData('charizard');
});
document.getElementById('filterA1').addEventListener('click', () => {
  filterPokemonData('a1');
});
document.getElementById('filterMew').addEventListener('click', () => {
  filterPokemonData('mew');
});
document.getElementById('filterdialga').addEventListener('click', () => {
  filterPokemonData('dialga');
});
document.getElementById('filterpalkia').addEventListener('click', () => {
  filterPokemonData('palkia');
});
document.getElementById('filterA2').addEventListener('click', () => {
  filterPokemonData('a2');
});

document.getElementById('clearFilter').addEventListener('click', () => {
  clearFilter();
});

const clearFilter = () => {
  const rows = document.querySelectorAll('#collection tbody tr');
  rows.forEach(row => {
    row.style.display = '';
  });
};

const filterPokemonData = (packName) => {
  const rows = document.querySelectorAll('#collection tbody tr');
  rows.forEach(row => {
    const packCell = row.querySelector('td:nth-child(4)');
    if (packCell) {
      if (packCell.textContent === packDisplayName(packName)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }
  });
};


// 創建卡片總覽表格+計算各卡包卡牌總數
// 獲取<table>的<tbody>元素
const tbody = document.querySelector('#collection tbody');
// 函數：將物件陣列中的每一個物件加入到表格中
pokemonData.forEach(obj => {
    // 創建一個新的<tr>元素
    const row = document.createElement('tr');
    // 創建並加入checkbox的<td>元素
    const cellCheckbox = document.createElement('td');
    const checkboxInCell = document.createElement('input');
    checkboxInCell.className = 'pokeomOwnCheckbox';
    checkboxInCell.type = 'checkbox';
    checkboxInCell.id = 'checkbox'+obj.id;
    checkboxInCell.addEventListener('change', function() {
        checkboxChange(this, { id: this.id, checked: this.checked });
      });
    cellCheckbox.appendChild(checkboxInCell);
    row.appendChild(cellCheckbox);
    // 創建並加入id的<td>元素
    const cellId = document.createElement('td');
    cellId.textContent = obj.id.slice(0,-3)+"-"+obj.id.slice(-3);
    row.appendChild(cellId);
    // 創建並加入name的<td>元素
    const cellName = document.createElement('td');
    cellName.textContent = obj.name;
    row.appendChild(cellName);
    // 創建並加入pack的<td>元素
    const cellPack = document.createElement('td');
    const tranPackName = packDisplayName(obj.pack);
    cellPack.textContent = tranPackName;
    row.appendChild(cellPack);
    // 創建並加入pack的<td>元素
    const cellRarity = document.createElement('td');
    const img = document.createElement("img");
    img.className = "cardRarity";  // 設置樣式類別
    img.src = `./asset/img/${obj.rarity}.png`;
    cellRarity.appendChild(img);
    //cellRarity.textContent = obj.rarity;
    row.appendChild(cellRarity);

    // 將這個<tr>元素加入到<tbody>中
    tbody.appendChild(row);

    // 計算各卡包卡牌總數
    cardIdent(obj,"all");
});


const checkboxChange = (checkbox) => {
    // 取得 checkbox 的 ID
    const checkboxId = checkbox.id.replace('checkbox', '');
    // 在物件陣列中查找對應的物件
    const foundItem = pokemonData.find(item => item.id === checkboxId);
    if (foundItem) {
      // 處理根據 checkbox 被勾選或取消勾選的邏輯
      if (checkbox.checked) {
        cardIdent(foundItem,"own","plu");
      } else {
        cardIdent(foundItem,"own","sub");
      }
      checkboxChangeText(foundItem);
    }
};

// 如果checkbox有變動，則渲染新的數字
const checkboxChangeText = (foundItem) => {
  //卡包完成%數
  const totalCards = packAllCount[`${foundItem.pack}AllCount`];
  const ownedCards = cardOwnCount[`${foundItem.pack}OwnCount`];
  if (totalCards > 0) {
    document.getElementById(`${foundItem.pack}Percentage`).textContent = Math.round((ownedCards / totalCards) * 100) + "%";
  } else {
    document.getElementById(`${foundItem.pack}Percentage`).textContent = "0%";
  }
  //卡包擁有/總數
  document.getElementById(`${foundItem.pack}Div`).textContent = ownedCards + " / " + totalCards;
  //卡包稀有度%數
  if (foundItem.rarity) {
    const totalRarity = packAllRarityCount[`${foundItem.pack}All${foundItem.rarity}`];
    const ownedRarity = cardOwnRarityCount[`${foundItem.pack}Own${foundItem.rarity}`];
    if (totalRarity > 0) {
      document.getElementById(`${foundItem.pack}${foundItem.rarity}`).textContent = Math.round((ownedRarity / totalRarity) * 100) + "%";
    } else {
      document.getElementById(`${foundItem.pack}${foundItem.rarity}`).textContent = "";
    }
  }
};


// 用於儲存checkbox的值
let checkboxData = [];
// 將按鈕加上事件聆聽以讀取紀錄
document.getElementById('ownRead').addEventListener('click', () => readSave());
// 讀取紀錄的函式
const readSave = () => {
  const selectedValue = document.getElementById("fileSelect").value;
  fs.readFile(selectedValue, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file', err);
        return;
      }
    
      try {
        // 先將計數歸零，以避免每次讀取都累加
        for (let key in cardOwnCount) {
          cardOwnCount[key] = 0;
        }
        for (let key in cardOwnRarityCount) {
          cardOwnRarityCount[key] = 0;
        }
        checkboxData = JSON.parse(data); // 解析 JSON 字符串為物件陣列
        // 將相對的checkbox勾選
        checkboxData.forEach(item => {
          // 根據 id 選擇對應的 checkbox
          const checkbox = document.getElementById(item.id);
          if (checkbox) {
            // 更新 checkbox 的狀態
            checkbox.checked = item.checked;
            if(item.checked) {
              checkboxChange(checkbox);
            }
          }
        });
        // 更新所有的文字
        allPack.forEach(pack => {
          checkboxChangeText({ pack });
          allRarity.forEach(rarity => {
            checkboxChangeText({ pack, rarity });
          });
        });
      
        const readNsaveMessage = document.getElementById('readNsaveMessage');
        readNsaveMessage.classList.add('show');
        readNsaveMessage.textContent = '已讀取';
        // 在3秒後隱藏 "已儲存" 的文字
        setTimeout(() => {
          readNsaveMessage.classList.remove('show');
        }, 1000);

      } catch (err) {
        console.error('Error parsing JSON', err);
      }
    });
};
// 將按鈕加上事件聆聽以儲存覆蓋紀錄
document.getElementById('ownWrite').addEventListener('click', () => {
  const selectedValue = document.getElementById("fileSelect").value;  
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxData = [];
    allCheckboxes.forEach(checkbox => {
        checkboxData.push({
          id: checkbox.id,
          checked: checkbox.checked
        });
      });
    const jsonString = JSON.stringify(checkboxData, null, 2); // 將物件陣列轉換為 JSON 字符串
    fs.writeFile(selectedValue, jsonString, (err) => {
        if (err) {
          console.error('Error writing file', err);
        } else {
          console.log('File has been written');
          const readNsaveMessage = document.getElementById('readNsaveMessage');
          readNsaveMessage.classList.add('show');
          readNsaveMessage.textContent = '已儲存';
          // 在3秒後隱藏 "已儲存" 的文字
          setTimeout(() => {
            readNsaveMessage.classList.remove('show');
          }, 1000);
        }
    });
});

// 先讀取default.json以免除每次重啟都要手動讀取
readSave();


const backToTopBtn = document.getElementById("backToTopBtn");
// 當頁面滾動時，顯示或隱藏按鈕
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
};
// 當用戶點擊按鈕時，返回到頁面頂部
backToTopBtn.addEventListener('click', function() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});

// 將全部選擇/全部取消按鈕加上事件聆聽
document.getElementById("checkboxAllSelect").addEventListener('click', () => checkboxAllSelect("select"));
document.getElementById("checkboxAllUnselect").addEventListener('click', () => checkboxAllSelect("unselect"));
const checkboxAllSelect = (e) => {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  if (e == "select") {
    // 先重置所有計數器
    for (let key in cardOwnCount) {
      cardOwnCount[key] = 0;
    }
    for (let key in cardOwnRarityCount) {
      cardOwnRarityCount[key] = 0;
    }
    allCheckboxes.forEach(checkbox => {
      checkbox.checked = true;
      checkboxChange(checkbox);
    });
  } else if (e == "unselect") {
    // 先重置所有計數器
    for (let key in cardOwnCount) {
      cardOwnCount[key] = 0;
    }
    for (let key in cardOwnRarityCount) {
      cardOwnRarityCount[key] = 0;
    }
    
    allCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }
  // 更新所有的文字
  allPack.forEach(pack => {
    checkboxChangeText({ pack });
    allRarity.forEach(rarity => {
      checkboxChangeText({ pack, rarity });
    });
  });
};

//存檔一與存檔二比較收藏卡片的按鈕功能
//先讀取存檔一與存檔二的資料
const readFileAsync = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (err) {
          reject(err);
        }
      }
    });
  });
};
//比較兩個檔案的差異
const compareCheck = async (fileMain, fileCompare) => {
  let mainFileArry = [];
  fileMain.forEach(item => {
    if(item.checked===false){
      const foundItem = fileCompare.find(item2 => item2.id === item.id);
      if(foundItem && foundItem.checked){
        mainFileArry.push({
          id: item.id,
        });
      }
    }
  });
  return mainFileArry;
};
//儲存比較結果
const saveCompare = async () => {
  try {
    const saveFile1 = await readFileAsync("saveFile1.json");
    const saveFile2 = await readFileAsync("saveFile2.json");

    let f1CompareF2 = await compareCheck(saveFile1, saveFile2);
    let f2CompareF1 = await compareCheck(saveFile2, saveFile1);

    // 顯示比較結果
    const lightbox = document.getElementById('lightbox');
    
    const compare1sLeftcontainer = document.getElementById('compare1sLeft');
    const compare2sLeftcontainer = document.getElementById('compare2sLeft');
    const compare3sLeftcontainer = document.getElementById('compare3sLeft');
    const compare4sLeftcontainer = document.getElementById('compare4sLeft');
    const compare1gLeftcontainer = document.getElementById('compare1gLeft');
    const compare1sRightcontainer = document.getElementById('compare1sRight');
    const compare2sRightcontainer = document.getElementById('compare2sRight');
    const compare3sRightcontainer = document.getElementById('compare3sRight');
    const compare4sRightcontainer = document.getElementById('compare4sRight');
    const compare1gRightcontainer = document.getElementById('compare1gRight');

    compare1sLeftcontainer.innerHTML = '';
    compare2sLeftcontainer.innerHTML = '';
    compare3sLeftcontainer.innerHTML = '';
    compare4sLeftcontainer.innerHTML = '';
    compare1gLeftcontainer.innerHTML = '';
    compare1sRightcontainer.innerHTML = '';
    compare2sRightcontainer.innerHTML = '';
    compare3sRightcontainer.innerHTML = '';
    compare4sRightcontainer.innerHTML = '';
    compare1gRightcontainer.innerHTML = '';

    const compareTable = (e,dir) => {
      e.forEach(item => {
        pokemonData.forEach(obj => {
          if(obj.id === item.id.slice(8)){
            const row = document.createElement('tr');
            const cellId = document.createElement('td');
            cellId.textContent = obj.id.slice(0,-3)+"-"+obj.id.slice(-3);
            row.appendChild(cellId);
            const cellName = document.createElement('td');
            cellName.textContent = obj.name;
            row.appendChild(cellName);
            const cellPack = document.createElement('td');
            const tranPackName = packDisplayName(obj.pack);
            cellPack.textContent = tranPackName;
            row.appendChild(cellPack);
            const containerName = `compare${obj.rarity}${dir}`;
            const container = document.getElementById(containerName);
            if (container) {
              container.appendChild(row);
            }
          }
        });
      });
    };

    compareTable(f1CompareF2,"Left");
    compareTable(f2CompareF1,"Right");

    lightbox.style.display = 'block';
  } catch (err) {
    console.error('Error:', err);
  }
};

document.getElementById("saveCompare").addEventListener('click', saveCompare);

// 關閉燈箱功能
document.querySelector('.lightbox-close').addEventListener('click', () => {
  document.getElementById('lightbox').style.display = 'none';
});
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === document.getElementById('lightbox')) {
    document.getElementById('lightbox').style.display = 'none';
  }
});
