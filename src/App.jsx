import React, { useState } from 'react';
import MapComponent from './MapComponent';

// --- Icons ---
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const LogoIcon = () => (
<svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon 
    points="10,55 75,20 55,60" 
    fill="#f2ede7"
  />
  <polygon 
    points="75,20 90,80 55,60" 
    fill="#f28b28"
  />
</svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 hover:text-red-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 hover:text-blue-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

function App() {
  const [areas, setAreas] = useState([]);

  const handleShapeCreated = () => {
      const newAreaId = areas.length + 1;
      setAreas([...areas, { id: newAreaId, name: `Area ${newAreaId}` }]);
  };

  const handleHomeClick = () => {
      setAreas([]); 
  };

  const handleDeleteArea = (id) => {
      setAreas(areas.filter(area => area.id !== id));
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      
      {/* 1. LEFT ICON BAR (Always Visible) */}
      <div className="w-16 h-full bg-[#2C3333] flex flex-col items-center py-6 space-y-8 z-20 shadow-lg shrink-0">
          <div className="cursor-pointer mb-4"><LogoIcon /></div>
          
          <div 
            onClick={handleHomeClick}
            className="p-3 bg-[#E8CBA7] rounded-lg cursor-pointer hover:bg-[#d6b792] transition text-[#2C3333]"
            title="Reset to Search (Home)"
          >
             <HomeIcon />
          </div>

          <div className="p-3 text-[#E8CBA7] cursor-pointer hover:text-white transition">
             <DashboardIcon />
          </div>
      </div>

      {/* 2. DYNAMIC SIDEBAR CONTENT */}
      <div className="w-80 h-full bg-white shadow-xl z-10 flex flex-col font-sans border-r border-gray-200 shrink-0">
        
        {/* LOGIC: IF NO AREAS -> SHOW SEARCH VIEW. IF AREAS EXIST -> SHOW ACCORDION VIEW */}
        {areas.length === 0 ? (
            
            // --- STATE A: INITIAL SEARCH VIEW (Matches your new image) ---
            <div className="p-6 flex flex-col h-full animate-fade-in">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-6">
                    <span className="text-gray-400 text-lg cursor-pointer">‹</span>
                    <h1 className="text-lg font-normal text-orange-500">Define Area of Interest</h1>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <p className="text-gray-800 text-base leading-relaxed">
                        <span className="font-bold">Define the area(s)</span> where you will apply your object count & detection model
                    </p>
                </div>

                {/* Options Label */}
                <div className="text-sm text-gray-600 mb-2">Options:</div>

                {/* Search / Draw Box */}
                <div className="bg-[#F5F2EB] border border-[#E8DCC8] rounded-lg p-5 mb-4 flex flex-col justify-center h-32 cursor-pointer hover:bg-[#efeadd] transition">
                    <div className="flex items-center space-x-2 text-gray-500 mb-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <span className="font-bold text-gray-600">Search</span>
                        <span className="text-gray-500">for a city, town...</span>
                    </div>
                    <div className="text-gray-500 ml-7">
                        or <span className="font-bold text-gray-600">draw</span> area on map
                    </div>
                </div>

                {/* Upload Button */}
                <div className="bg-[#F5F2EB] border border-[#E8DCC8] rounded-lg p-4 flex items-center space-x-3 text-gray-500 cursor-pointer hover:bg-[#efeadd] transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span>Uploading a shape file</span>
                </div>
            </div>

        ) : (

            // --- STATE B: PROJECT SCOPE ACCORDION (Matches your old image) ---
            <div className="flex flex-col h-full animate-fade-in">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center text-gray-400 text-sm mb-4 cursor-pointer hover:text-orange-500" onClick={handleHomeClick}>
                        <span className="mr-2">‹</span> Back
                    </div>
                    <h1 className="text-xl font-normal text-orange-500">Define Project Scope</h1>
                </div>
                
                {/* Accordion Sections */}
                <div className="flex-1 overflow-y-auto">
                    
                    {/* Section 1: Base Image (Collapsed style) */}
                    <div className="py-4 px-6 border-b border-gray-100 flex justify-between items-center text-gray-500 cursor-pointer hover:bg-gray-50">
                        <span>Select Base Image</span>
                        <span className="text-2xl leading-none text-gray-400">+</span>
                    </div>

                    {/* Section 2: Area of Interest (Expanded) */}
                    <div className="py-4 px-6 border-b border-gray-100">
                        <div className="flex justify-between items-center text-gray-700 mb-4 cursor-pointer">
                            <span>Define Area of Interest</span>
                            <span className="text-2xl leading-none text-gray-400">+</span>
                        </div>

                        {/* List of Areas */}
                        <div className="space-y-2">
                            {areas.map((area) => (
                                <div key={area.id} className="flex items-center justify-between group cursor-pointer p-2 hover:bg-gray-50 rounded">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-4 h-4 bg-[#E8CBA7] rounded-sm"></div>
                                        <span className="text-gray-600 text-sm font-medium">{area.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div onClick={() => handleDeleteArea(area.id)}><TrashIcon /></div>
                                        <EyeIcon />
                                        <span className="text-gray-300">⋮</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Define Objects (Collapsed) */}
                    <div className="py-4 px-6 border-b border-gray-100 flex justify-between items-center text-gray-500 cursor-pointer hover:bg-gray-50">
                        <span>Define Objects</span>
                        <span className="text-2xl leading-none text-gray-400">+</span>
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* 3. MAP AREA */}
      <div className="flex-1 h-full relative">
        <MapComponent onShapeCreated={handleShapeCreated} />
      </div>
    </div>
  );
}

export default App;