import React from 'react';

const TrendsList = () => {
    // Aquí puedes definir una lista de tendencias desde un estado o propiedades
    const trends = ["#ReactJS", "#OpenAI", "#ClonTwitter", "#GPT4"];

    return (
        <div>
            {trends.map((trend, index) => (
                <div key={index} className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg mb-2">
                    {trend}
                </div>
            ))}
        </div>
    );
};

export default TrendsList;
