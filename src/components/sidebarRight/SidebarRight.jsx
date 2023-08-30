import React from 'react';
import TrendsList from './TrendList';
import FollowSuggestions from './FollowSuggestions';

const SidebarRight = () => {
    return (
        <div>
            {/* Sección de Tendencias */}
            <div className="p-4 border-b border-gray-200">
                <h2 className="font-bold mb-3">Tendencias para ti</h2>
                <TrendsList />
            </div>

            {/* Sección de Sugerencias para seguir */}
            <div className="p-4">
                <h2 className="font-bold mb-3">A quién seguir</h2>
                <FollowSuggestions />
            </div>
        </div>
    );
};

export default SidebarRight;
