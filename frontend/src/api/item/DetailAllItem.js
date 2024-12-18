import React, {useEffect} from "react";

function DetailAllItem ({ onItemFetch }) {
    useEffect(() => {
        fetch("http://localhost:80/api/item").then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            return response.json();
        }).then((data) => {
                if(onItemFetch){
                    onItemFetch(data)
                }
        }).catch((error) =>
            console.log("Error fetching item data:", error)
        );
    }, []);
    return null;
}

export default DetailAllItem;