import React, { useState } from 'react';
import { Plus, Search, Filter, Grid, List, Calendar, Layout, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GreenHousePlanner from '../components/GreenHousePlanner';
import { PlantIcon } from '@/components/PlantIcon';

const Plants = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const monthNames = [
    'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
    'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
  ];

  const plants = [
    {
      name: 'Paradajz',
      variety: 'Solanum lycopersicum',
      icon: 'tomato'
    },
    {
      name: 'Paprika',
      variety: 'Capsicum annuum',
      icon: 'pepper'
    },
    {
      name: 'Krastavac',
      variety: 'Cucumis sativus',
      icon: 'cucumber'
    },
    {
      name: 'Kupus',
      variety: 'Brassica oleracea var. capitata',
      icon: 'cabbage'
    },
    {
      name: 'Keleraba',
      variety: 'Brassica oleracea var. gongylodes',
      icon: 'kohlrabi'
    },
    {
      name: 'Salata',
      variety: 'Lactuca sativa',
      icon: 'lettuce'
    },
    {
      name: 'Spanać',
      variety: 'Spinacia oleracea',
      icon: 'spinach'
    },
    {
      name: 'Rotkvica',
      variety: 'Raphanus sativus',
      icon: 'radish'
    },
    {
      name: 'Grašak',
      variety: 'Pisum sativum',
      icon: 'peas'
    },
    {
      name: 'Mrkva',
      variety: 'Daucus carota',
      icon: 'carrot'
    },
    {
      name: 'Peršun',
      variety: 'Petroselinum crispum',
      icon: 'parsley'
    },
    {
      name: 'Paštrnak',
      variety: 'Pastinaca sativa',
      icon: 'parsnip'
    },
    {
      name: 'Crni luk',
      variety: 'Allium cepa',
      icon: 'onion'
    },
    {
      name: 'Beli luk',
      variety: 'Allium sativum',
      icon: 'garlic'
    },
    {
      name: 'Krompir',
      variety: 'Solanum tuberosum',
      icon: 'potato'
    },
    {
      name: 'Kelj',
      variety: 'Brassica oleracea var. sabauda',
      icon: 'kale'
    },
    {
      name: 'Karfiol',
      variety: 'Brassica oleracea var. botrytis',
      icon: 'cauliflower'
    },
    {
      name: 'Ren',
      variety: 'Armoracia rusticana',
      icon: 'horseradish'
    },
    {
      name: 'Plavi Patlidžan',
      variety: 'Solanum melongena',
      icon: 'eggplant'
    },
    {
      name: 'Tikvica',
      variety: 'Cucurbita pepo',
      icon: 'zucchini'
    },
    {
      name: 'Pasulj',
      variety: 'Phaseolus vulgaris',
      icon: 'beans'
    },
    {
      name: 'Boranija',
      variety: 'Phaseolus vulgaris var. vulgaris',
      icon: 'green-beans'
    },
    {
      name: 'Celer',
      variety: 'Apium graveolens',
      icon: 'celery'
    },
    {
      name: 'Praziluk',
      variety: 'Allium porrum',
      icon: 'leek'
    },
    {
      name: 'Lubenica',
      variety: 'Citrullus lanatus',
      icon: 'watermelon'
    },
    {
      name: 'Dinja',
      variety: 'Cucumis melo',
      icon: 'melon'
    }
  ];

  const calendarData = {
    'Januar': [
      'Priprema leja i tunela',
      'Setva u leje paprike, paradajza, krastavca i salate',
      'Nega biljaka u leji',
      'Kontrola povrća u trapu i u podrumu',
      'Ispitivanje klijavosti semena'
    ],
    'Februar': [
      'Setva u leje paradajza, paprike, kupusa i kelerabe za ranu njivsku proizvodnju',
      'Nega rasada u leji: provetravanje, zalivanje, prihrana i zaštita',
      'Pikiranje paradajza i paprike posejane u januaru',
      'Priprema bašte za ranu stevu',
      'Primena zemljišnih herbicida na površinama za uzgoj crnog luka i graška',
      'Sadnja crnog i belog luka i setva spanaća, salate, rotkvice, graška, mrkve, peršuna i paštrnaka'
    ],
    'Mart': [
      'Setva spanaća, salate, rotkvice, graška, mrkve, peršuna i paštrnaka',
      'Sadnja krompira, salate, kupusa, kelja, kelerabe i rena',
      'Izgradnja i priprema mlakih leja',
      'Setva paprike, paradajza, plavog patliidžana, celera i kupusnjača za proizvodnju rasada'
    ],
    'April': [
      'Uništavanje korova zemljišnim herbicidima',
      'Suzbijanje korova u izniklom luku, grašku i dr.povrću',
      'Nega rasada paradajza, paprike i plavog patlidžana u leji',
      'Završavanje setve luka, graška i mrkve',
      'Direktna setva paprike, paradajza, krastavca, tikvice, pasulja',
      'Sadnja krompira, kupusa, karfiola i kelerabe',
      'Berba salate, spanaća, rotkvica i mladog luka'
    ],
    'Maj': [
      'Suzbijanje korova u izniklom povrću',
      'Zaštita paradajza, krompira, krastavca i kupusa',
      'Praćenje razvoja krompirove zlatice',
      'Prihrana, zalivanje i okopavanje useva',
      'Setva pasulja, krastavaca, lubenica, dinja',
      'Sadnja paprike, paradajza, krastavca',
      'Berba kelja, salate, spanaća, graška'
    ],
    'Jun': [
      'Zaštita paradajza, krastavaca, luka i kupusa',
      'Zaštita paprike od bakteriozne pegavosti',
      'Zaštita lubenica od fuzarioznog uvenuća',
      'Prihranjivanje biljaka',
      'Berba kupusa, kelja, karfiola, kelerabe',
      'Priprema zemljišta i setva rotkvice, salate'
    ],
    'Jul': [
      'Zaštita paprike, paradajza, krastavaca',
      'Zaštita pasulja i boranije od bakterija',
      'Prihrana i zalivanje useva',
      'Berba paradajza, paprike i krastavca',
      'Setva postrne boranije, kornišona i rotkve',
      'Sadnja kupusa, kelja, karfiola'
    ],
    'Avgust': [
      'Nega useva na polju',
      'Zaštita od bolesti i štetočina',
      'Vađenje crnog luka',
      'Berba paprike, paradajza, plavog patlidžana',
      'Setva salate, spanaća, rotkve'
    ],
    'Septembar': [
      'Zaštita od bolesti sa najkraćom karencom',
      'Nega rasada salate i luka srebrnjaka',
      'Zaštita od ranih mrazeva',
      'Berba boranije, kornišona, paradajza',
      'Setva rotkve, spanaća i salate'
    ],
    'Oktobar': [
      'Sadnja salate, belog i crnog luka',
      'Jesenja setva spanaća i graška',
      'Dozrevanje paradajza',
      'Vađenje korenastog povrća',
      'Berba kupusa, karfiola, rena i rotkve'
    ],
    'Novembar': [
      'Berba kasnog kupusa i kelja pupčara',
      'Vađenje celera, praziluka, mrkve',
      'Trapaljenje povrća',
      'Uklanjanje biljnih ostataka',
      'Kasna jesenja obrada zemljišta'
    ],
    'Decembar': [
      'Obilazak useva na polju',
      'Kontrola utrapljenog povrća',
      'Priprema zemljišta za leje',
      'Popravka alata',
      'Setva salate, luka i paprike'
    ]
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.variety.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Biljke</h1>
            <p className="text-gray-600">Pregled biljaka u bašti</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Dodaj biljku</span>
          </button>
        </div>

        <Tabs defaultValue="plants" className="space-y-6">
          <TabsList>
            <TabsTrigger value="plants" className="flex items-center gap-2">
              <Grid className="h-4 w-4" />
              Biljke
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Kalendar
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Planer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plants">
            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Pretražite biljke..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="h-4 w-4" />
                    <span>Filteri</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-green-100 text-green-600'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-green-100 text-green-600'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Plants Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPlants.map((plant, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center mb-4">
                      <PlantIcon name={plant.icon} className="w-16 h-16 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">{plant.name}</h3>
                    <p className="text-sm text-center text-gray-600 italic">{plant.variety}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPlants.map((plant, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-6">
                      <PlantIcon name={plant.icon} className="w-12 h-12 text-green-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{plant.name}</h3>
                        <p className="text-sm text-gray-600 italic">{plant.variety}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredPlants.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">Nema pronađenih biljaka</div>
                <button className="text-green-600 hover:text-green-700">
                  Dodajte novu biljku
                </button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="calendar" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900">{monthNames[currentMonth]}</h2>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              {calendarData[monthNames[currentMonth]].map((task, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                  <p className="text-gray-700">{task}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="planner">
            <GreenHousePlanner />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Plants;