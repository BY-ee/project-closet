import React, {useEffect} from "react";

function FetchAllProduct ({ onItemFetch }) {
    useEffect(() => {
        fetch("http://localhost:80/api/itemAll").then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            return response.json();
        }).then((data) => {
                if(onItemFetch){
                    onItemFetch(data)
                    console.log("data: ", data)
                }
        }).catch((error) =>
            console.log("Error fetching item data:", error)
        );
    }, []);
    return null;
}

export default FetchAllProduct;