import { useEffect, useState } from "react";

export default function NavBarActive() {
    const [actives, setActives] = useState([]);

//     "activitie": {
//     "id": "activity001",
//     "name": "618大促",
//     "startDate": "2025-06-01",
//     "endDate": "2025-06-18",
//     "discount": 0.2,
//     "description": "618大促，满100减20",
//     "image": "/images/activity1.jpg"
//   }
    useEffect(() => {
        fetch("http://localhost:3001/activities")
            .then(res => res.json())
            .then(data => setActives(data))
            .catch(err => console.error("加载活动图失败", err));
    }, []);

    const hasActive=actives && actives.length>0;

    return (
        <>
            {hasActive && (
                <nav className="p-2 px-12">
                    <div className="flex justify-center bg-green-100">
                      <img src={actives[0].image} alt="活动图" className="h-40 object-cover" />
                    </div>
                </nav>
            )}
        </>
    );
}

