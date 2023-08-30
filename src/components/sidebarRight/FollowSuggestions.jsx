import React from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const FollowSuggestions = () => {
    // Aquí puedes definir una lista de sugerencias desde un estado o propiedades
    const suggestions = [
        { name: "Juan Perez", username: "@juanp" },
        { name: "Maria Gomez", username: "@mariag" },
        { name: "Pedro Sanchez", username: "@pedros" }
    ];

    return (
        <div>
            {suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg mb-2">
                    <PersonOutlineIcon />
                    <div>
                        <div className="font-bold">{suggestion.name}</div>
                        <div className="text-gray-500">{suggestion.username}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FollowSuggestions;
