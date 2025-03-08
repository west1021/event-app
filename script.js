const API_URL = "https://script.google.com/macros/s/【GASのデプロイURL】/exec?type=events";

async function fetchEvents() {
    try {
        const response = await fetch(API_URL);
        const events = await response.json();
        
        const eventList = document.getElementById("eventList");
        eventList.innerHTML = ""; // 一覧をクリア

        events.forEach(event => {
            const li = document.createElement("li");
            li.innerHTML = `${event.name} (${event.date}) 
                <button onclick="editEvent(${event.id}, '${event.name}', '${event.date}')">編集</button>`;
            eventList.appendChild(li);
        });

    } catch (error) {
        console.error("エラー:", error);
    }
}

// 初回ロード時に一覧を取得
fetchEvents();

function editEvent(id, name, date) {
    // 編集フォームへ遷移（クエリパラメータでデータを渡す）
    window.location.href = `form.html?id=${id}&name=${encodeURIComponent(name)}&date=${date}`;
}
