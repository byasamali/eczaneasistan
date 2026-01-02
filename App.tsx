import React, { useState } from 'react';
import { BmiView, BsaView, CalciumView, AlcoholView } from './views/SimpleCalculators';
import { WhoView } from './views/WhoCalculator';
import { MfView } from './views/MfCalculator';
import { LayoutGrid, Calculator, Baby, TrendingUp, FlaskConical, Droplets, Activity, Tag, Smartphone, User, MessageCircle, Home, Info, HeartPulse, ChevronRight } from 'lucide-react';

// Enum for navigation tabs
enum Tab {
  Home = 'home',
  Calculators = 'calcs',
  Stock = 'stock',
  Info = 'info'
}

enum Tool {
  BMI = 'bmi',
  BSA = 'bsa',
  Calcium = 'calc',
  Alcohol = 'alc',
  WHO = 'who',
  MF = 'mf'
}

const App = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const renderBody = () => {
    if (activeTool) {
        return (
            <div className="animate-in slide-in-from-right duration-300 bg-white min-h-screen">
                <div className="flex items-center p-4 bg-white border-b sticky top-0 z-10">
                    <button 
                        onClick={() => setActiveTool(null)}
                        className="p-2 -ml-2 text-teal-600 font-medium flex items-center gap-1"
                    >
                        <LayoutGrid size={18} /> Geri
                    </button>
                    <div className="flex-1 text-center font-bold text-slate-700 pr-8">
                        {activeTool === Tool.MF ? 'MF Stok Analizi' : 'Hesaplama Aracı'}
                    </div>
                </div>
                {activeTool === Tool.BMI && <BmiView />}
                {activeTool === Tool.BSA && <BsaView />}
                {activeTool === Tool.Calcium && <CalciumView />}
                {activeTool === Tool.Alcohol && <AlcoholView />}
                {activeTool === Tool.WHO && <WhoView />}
                {activeTool === Tool.MF && <MfView />}
            </div>
        );
    }

    switch (activeTab) {
      case Tab.Calculators: return <CalculatorList onSelect={setActiveTool} />;
      case Tab.Stock: return <MfView />;
      case Tab.Info: return <DeveloperInfo />;
      default: return <HomeDashboard onSelect={setActiveTool} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-2xl relative overflow-x-hidden">
      {/* Header */}
      {!activeTool && (
        <header className="bg-white px-6 py-4 flex items-center justify-between border-b sticky top-0 z-20">
            <div className="flex items-center gap-2">
                <div className="bg-teal-600 p-1.5 rounded-lg text-white">
                    <HeartPulse size={20} />
                </div>
                <h1 className="font-extrabold text-xl text-slate-800 tracking-tight">Eczacı Asistanı</h1>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <User size={18} className="text-slate-400" />
            </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24">
        {renderBody()}
      </main>

      {/* Bottom Navigation */}
      {!activeTool && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 px-6 py-3 flex justify-between items-center z-30 max-w-md mx-auto">
            <NavButton active={activeTab === Tab.Home} onClick={() => setActiveTab(Tab.Home)} icon={<Home size={22} />} label="Ana Sayfa" />
            <NavButton active={activeTab === Tab.Calculators} onClick={() => setActiveTab(Tab.Calculators)} icon={<Calculator size={22} />} label="Hesaplar" />
            <NavButton active={activeTab === Tab.Stock} onClick={() => setActiveTab(Tab.Stock)} icon={<TrendingUp size={22} />} label="MF Analiz" />
            <NavButton active={activeTab === Tab.Info} onClick={() => setActiveTab(Tab.Info)} icon={<Info size={22} />} label="İletişim" />
        </nav>
      )}
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-teal-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
    >
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </button>
);

const HomeDashboard = ({ onSelect, setActiveTab }: { onSelect: (t: Tool) => void, setActiveTab: (t: Tab) => void }) => {
    const pratiketWhatsapp = "https://wa.me/905523624027?text=Merhaba,%20Pratiket%20etiket%20programı%20hakkında%20bilgi%20almak%20istiyorum.";
    
    return (
        <div className="p-6 animate-in fade-in duration-500">
            
            {/* Pratiket Ad section */}
            <div 
                onClick={() => window.open(pratiketWhatsapp, '_blank')}
                className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl mb-8 relative overflow-hidden active:scale-[0.98] transition-all cursor-pointer border border-orange-400"
            >
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Tag size={16} className="text-orange-200" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-orange-100">Pratiket Etiket Programı</span>
                    </div>
                    <h2 className="text-3xl font-black mb-1 leading-tight tracking-tight uppercase">PRATİKET</h2>
                    <p className="text-orange-50 text-sm font-medium opacity-90 mb-1 leading-snug">
                        Eczaneler için geliştirilmiş<br/>profesyonel etiketleme çözümü.
                    </p>
                    <p className="text-white text-md font-black mb-3 animate-blink tracking-tighter">
                        15 GÜN ÜCRETSİZ DEMO!
                    </p>
                    <div className="mb-4">
                        <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl text-xl font-black tracking-tighter shadow-inner">
                             1.500 TL / YIL
                        </span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <button className="bg-white text-orange-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-2">
                                <MessageCircle size={14} /> WHATSAPP İLETİŞİM
                            </button>
                        </div>
                        <div className="text-[11px] font-bold text-orange-100 flex items-center gap-1">
                            <Smartphone size={12} /> 0552 362 40 27 — Ecz. Burak YAŞAMALI
                        </div>
                    </div>
                </div>
                <Smartphone className="absolute -bottom-6 -right-6 text-white/10" size={160} />
            </div>

            <section className="mb-8">
                <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Hızlı Erişim</h3>
                <div className="grid grid-cols-2 gap-4">
                    <ToolCard icon={<Baby className="text-pink-500" />} title="WHO Z-Skor" onClick={() => onSelect(Tool.WHO)} />
                    <ToolCard icon={<TrendingUp className="text-indigo-500" />} title="MF Analiz" onClick={() => onSelect(Tool.MF)} />
                </div>
            </section>

            <section>
                 <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Popüler Araçlar</h3>
                 <div className="space-y-3">
                    <ToolRow icon={<Activity className="text-teal-500" />} title="Vücut Kitle İndeksi" desc="Boy/Kilo Analizi" onClick={() => onSelect(Tool.BMI)} />
                    <ToolRow icon={<FlaskConical className="text-amber-500" />} title="Alkol Seyreltme" desc="Majistral Hazırlık" onClick={() => onSelect(Tool.Alcohol)} />
                 </div>
            </section>
        </div>
    );
};

const CalculatorList = ({ onSelect }: { onSelect: (t: Tool) => void }) => (
    <div className="p-6 animate-in fade-in duration-500">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Hesaplama Araçları</h2>
        
        <div className="mb-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Klinik Hesaplamalar</h3>
            <div className="space-y-3">
                <ToolRow icon={<Baby />} title="WHO Z-Skoru" desc="Gelişim takibi (0-19 Yaş)" onClick={() => onSelect(Tool.WHO)} />
                <ToolRow icon={<Activity />} title="VKİ Hesapla" desc="Boy/Kilo durumu analizi" onClick={() => onSelect(Tool.BMI)} />
                <ToolRow icon={<Calculator />} title="Vücut Yüzey Alanı" desc="BSA (Mosteller)" onClick={() => onSelect(Tool.BSA)} />
                <ToolRow icon={<Droplets />} title="Düzeltilmiş Kalsiyum" desc="Albümin bazlı düzeltme" onClick={() => onSelect(Tool.Calcium)} />
            </div>
        </div>

        <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Laboratuvar & Ticari</h3>
            <div className="space-y-3">
                <ToolRow icon={<FlaskConical />} title="Alkol Seyreltme" desc="Etanol seyreltme hesabı" onClick={() => onSelect(Tool.Alcohol)} />
                <ToolRow icon={<TrendingUp />} title="MF Stok Analizi" desc="Karlılık ve mal fazlası analizi" onClick={() => onSelect(Tool.MF)} />
            </div>
        </div>
    </div>
);

const ToolCard = ({ icon, title, onClick }: { icon: React.ReactNode, title: string, onClick: () => void }) => (
    <button onClick={onClick} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 active:scale-95 active:bg-slate-50 transition-all text-center group">
        <div className="p-3 bg-slate-50 rounded-2xl group-active:bg-white transition-colors">{icon}</div>
        <span className="font-bold text-slate-700 text-sm tracking-tight">{title}</span>
    </button>
);

const ToolRow = ({ icon, title, desc, onClick }: { icon: React.ReactNode, title: string, desc: string, onClick: () => void }) => (
    <button onClick={onClick} className="w-full bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 active:bg-slate-50 active:scale-[0.98] transition-all text-left group">
        <div className="p-3 bg-slate-50 rounded-2xl group-active:bg-white transition-colors">{icon}</div>
        <div className="flex-1">
            <div className="font-bold text-slate-800 tracking-tight">{title}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{desc}</div>
        </div>
        <div className="text-slate-200">
            <ChevronRight size={20} />
        </div>
    </button>
);

const DeveloperInfo = () => {
    const whatsappLink = "https://wa.me/905523624027";
    return (
        <div className="p-6 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-white">
                <User size={48} className="text-teal-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Ecz. Burak YAŞAMALI</h2>
            <p className="text-teal-600 font-bold mb-8 uppercase text-xs tracking-[0.2em]">Uygulama Geliştiricisi</p>
            
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 mb-8 text-left">
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                    Bu uygulama, eczacıların günlük pratiklerini kolaylaştırmak amacıyla geliştirilmiştir. Öneri ve destek talepleriniz için bana ulaşabilirsiniz.
                </p>
                <a 
                    href={`${whatsappLink}?text=Merhaba,%20Eczacı%20Asistanı%20hakkında%20bilgi%20almak%20istiyorum.`}
                    target="_blank"
                    className="flex items-center justify-center gap-3 bg-green-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-green-100 hover:bg-green-600 active:scale-95 transition-all text-sm uppercase tracking-wider"
                >
                    <MessageCircle size={20} /> WhatsApp İletişim
                </a>
            </div>

            {/* Pratiket Promotion box (Sponsorlu ibaresi kaldırıldı) */}
            <div 
                onClick={() => window.open(`https://wa.me/905523624027?text=Merhaba, Pratiket etiket programı hakkında bilgi almak istiyorum.`, '_blank')}
                className="bg-orange-50 border border-orange-200 p-6 rounded-[2rem] text-left relative overflow-hidden shadow-sm cursor-pointer active:scale-[0.99] transition-all"
            >
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Tag size={16} className="text-orange-600" />
                        <h4 className="font-black text-orange-800 uppercase tracking-[0.15em] text-[10px]">Pratiket Etiket Programı</h4>
                    </div>
                    <h5 className="font-black text-slate-800 text-lg mb-1 tracking-tight">Eczane Etiket Sistemi</h5>
                    <p className="text-xs text-slate-600 font-bold leading-relaxed mb-1">
                        Eczaneler için geliştirilmiş profesyonel etiketleme çözümü.
                    </p>
                    <p className="text-orange-600 text-xs font-black mb-4 animate-blink">
                        15 GÜN ÜCRETSİZ DEMO!
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                           <div className="text-orange-700 font-black text-2xl tracking-tighter">1.500 ₺ / YIL</div>
                           <div className="text-[10px] font-bold text-slate-400">0552 362 40 27 — Ecz. Burak YAŞAMALI</div>
                        </div>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-orange-600 shadow-md">
                            İLETİŞİME GEÇ
                        </button>
                    </div>
                </div>
                <Smartphone className="absolute -bottom-4 -right-4 text-orange-200 opacity-20" size={120} />
            </div>
        </div>
    );
};

export default App;