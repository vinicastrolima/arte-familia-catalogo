// Design: Confeitaria Editorial — interface mobile-first, creme editorial, vinho ameixa, ritmo assimétrico e CTAs orientados à compra.
import { useMemo, useState } from "react";
import catalogData from "@/data/catalog.json";
import { matchesSearch } from "@/lib/catalogSearch";
import { ArrowRight, CakeSlice, Check, Clock3, Image as ImageIcon, Instagram, MapPin, Menu, MessageCircle, Search, X } from "lucide-react";

const WHATSAPP = "https://wa.me/558293518545";
const heroImage = "/images/kit-festa-20-pessoas.jpg";
const productImage = "/images/arte-familia-hero.jpg";
const celebrationImage = "/images/arte-familia-hero.jpg";

const categories = [
  { id: "kits", label: "Kits Festa", note: "soluções completas" },
  { id: "bento", label: "Bento Cakes", note: "presentes e comemorações" },
  { id: "bolos", label: "Bolos e Tortas", note: "para compartilhar" },
  { id: "doces", label: "Doces", note: "por quantidade" },
  { id: "salgados", label: "Salgados", note: "fritos e assados" },
  { id: "lanches", label: "Mini Lanches", note: "para eventos" },
  { id: "coffee", label: "Coffee Break", note: "sob orçamento" },
  { id: "personalizados", label: "Bolos Personalizados", note: "feito para você" },
];

type Product = {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  description: string;
  size: string;
  price?: number;
  priceLabel?: string;
  image?: string;
  tags: string[];
  details: string;
  observation?: string;
  images?: string[];
};

const imageByProduct: Record<string, string> = {
  "kits-festa-001": "/images/kit-festa-2-pessoas.jpg",
  "kits-festa-002": "/images/kit-festa-5-pessoas.jpg",
  "kits-festa-003": "/images/kit-festa-10-pessoas.jpg",
  "kits-festa-005": "/images/kit-festa-20-pessoas.jpg",
  "bento-cakes-006": "/images/bentocake-10cm.jpg",
  "bento-cakes-007": "/images/bentocake-15cm-baixo.jpg",
  "bento-cakes-008": "/images/bentocake-15cm-alto.jpg",
  "bolos-e-tortas-009": "/images/rocambole-francesco-m.jpg",
  "bolos-e-tortas-010": "/images/tortilet-o.jpg",
  "bolos-e-tortas-011": "/images/empadao-de-frango.jpg",
  "bolos-e-tortas-012": "/images/rocambole-francesco-g.jpg",
  "bolos-e-tortas-013": "/images/francesco-feliz-aniversario.jpg",
  "doces-014": "/images/doce-simples-25-unidades.jpg",
  "doces-015": "/images/doces-simples-50-unidades.jpg",
  "doces-016": "/images/doces-simples-100-unidades.jpg",
  "doces-017": "/images/doce-gourmet-25-unidades.jpg",
  "doces-018": "/images/doce-gourmet-50-unidades.jpg",
  "doces-019": "/images/doces-gourmet-100-unidades.jpg",
  "salgados-020": "/images/coxinha-25-unidades.jpg",
  "salgados-021": "/images/coxinha-50-unidades.jpg",
  "salgados-022": "/images/coxinha-100-unidades.jpg",
  "salgados-023": "/images/salgado-simples-25-unidades.jpg",
  "salgados-024": "/images/salgado-simples-50-unidades.jpg",
  "salgados-025": "/images/salgados-simples-100-unidades.jpg",
  "salgados-026": "/images/salgados-especiais-25-unidades.jpg",
  "salgados-027": "/images/salgados-especiais-50-unidades.jpg",
  "salgados-028": "/images/salgados-especiais-100-unidades.jpg",
  "salgados-033": "/images/canap.jpg",
  "mini-lanches-029": "/images/mini-hot-dog.jpg",
  "mini-lanches-030": "/images/mini-hamburguer.jpg",
  "mini-lanches-034": "/images/mini-sanduiche-natural.jpg",
  "coffee-break-031": "/images/coffee-break-1.jpg",
  "bolos-personalizados-032": "/images/bolo-decorado-1.jpg",
};

const products: Product[] = catalogData.products.map((product) => ({
  id: product.id,
  category: ({
    "Kits Festa": "kits",
    "Bento Cakes": "bento",
    "Bolos e Tortas": "bolos",
    "Doces": "doces",
    "Salgados": "salgados",
    "Mini Lanches": "lanches",
    "Coffee Break": "coffee",
    "Bolos Personalizados": "personalizados",
  } as Record<string, string>)[product.category] ?? "kits",
  subcategory: product.subcategory,
  name: product.name,
  description: product.description,
  size: product.size,
  price: product.price ?? undefined,
  priceLabel: product.priceLabel ?? undefined,
  image: imageByProduct[product.id],
  tags: product.tags,
  details: product.details ?? "",
  observation: "observation" in product && typeof product.observation === "string" ? product.observation : undefined,
  images: "images" in product && Array.isArray(product.images) ? product.images : undefined,
}));

function detailItems(product: Product) {
  if (!product.details.trim()) return [];
  const cleanDetails = product.details.replace(/^.*?Inclui:\s*/i, "");
  return cleanDetails.split(";").map((item) => item.trim()).filter(Boolean);
}

function money(value?: number) {
  return value === undefined ? "Sob orçamento" : value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("kits");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const visibleProducts = useMemo(() => {
    if (search.trim()) {
      return products.filter((product) => {
        const category = categories.find((item) => item.id === product.category);
        return matchesSearch(search, [
          product.name,
          product.description,
          product.subcategory,
          product.size,
          product.tags,
          product.details,
          product.observation,
          category?.label,
          category?.note,
        ]);
      });
    }
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, search]);

  const active = categories.find((category) => category.id === activeCategory) ?? categories[0];
  const isSearching = search.trim().length > 0;
  const productImageClass = (product: Product) => product.id === "doces-014" ? "product-image product-image-zoom-in" : product.id === "doces-016" ? "product-image product-image-zoom-out" : "product-image";

  return (
    <div className="min-h-screen bg-[#f8f2e9] text-[#2d2022]">
      <header className="site-header">
        <div className="container header-inner">
          <a href="#inicio" className="brand-lockup" aria-label="Arte em Família início">
            <img className="brand-logo" src="/images/arte-em-familia-logo.png" alt="Arte em Família — Confeitaria Afetiva" />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#catalogo">Catálogo</a>
            <a href="#como-pedir">Como pedir</a>
            <a href="#entrega">Entrega</a>
          </nav>
          <a className="header-cta" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Pedir pelo WhatsApp</a>
          <button className="mobile-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Abrir menu">{mobileMenu ? <X /> : <Menu />}</button>
        </div>
        {mobileMenu && <div className="mobile-nav"><a href="#catalogo" onClick={() => setMobileMenu(false)}>Catálogo</a><a href="#como-pedir" onClick={() => setMobileMenu(false)}>Como pedir</a><a href="#entrega" onClick={() => setMobileMenu(false)}>Entrega</a></div>}
      </header>

      <main id="inicio">
        <section className="hero-section">
          <div className="hero-image" style={{ backgroundImage: `url(${heroImage})` }} aria-label="Mesa de doces e bolo"></div>
          <div className="hero-copy">
            <p className="eyebrow"><CakeSlice size={14} /> confeitaria afetiva em Maceió</p>
            <h1>Pequenos detalhes.<br /><span>Grandes momentos.</span></h1>
            <p className="hero-description">Bolos, Bento Cakes, doces, salgados e kits para celebrar do seu jeito — com sabor, cuidado e uma agenda que conversa com a sua ocasião.</p>
            <div className="hero-actions"><a className="primary-button" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Falar com a Arte em Família</a><a className="text-link" href="#catalogo">Explorar o catálogo <ArrowRight size={15} /></a></div>
            <div className="hero-note"><span className="note-line"></span><span>Retirada no Trapiche da Barra<br /><strong>Entrega disponível conforme a região.</strong></span></div>
          </div>
        </section>

        <section className="occasion-strip" aria-label="Ocasiões">
          <div className="container occasion-inner"><span className="occasion-intro">Para o momento que você está imaginando</span><div className="occasion-list"><span>aniversários</span><span>presentes</span><span>eventos</span><span>coffee breaks</span></div></div>
        </section>

        <section id="catalogo" className="catalog-section container">
          <div className="section-heading"><div><p className="eyebrow">o cardápio da casa</p><h2>Escolha por ocasião.</h2></div><div className="catalog-tools"><form className="search-box" onSubmit={(event) => event.preventDefault()} role="search"><Search size={17} /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar produto" aria-label="Buscar somente produtos" />{isSearching && <button type="button" className="search-clear" onClick={() => setSearch("")} aria-label="Limpar busca" title="Limpar busca"><X size={15} /></button>}<button type="submit" className="search-submit" aria-label="Buscar produto" title="Buscar produto"><ArrowRight size={15} /></button></form></div></div>
          <div className="category-scroll" aria-label="Categorias do catálogo">{categories.map((category) => <button key={category.id} className={`category-pill ${activeCategory === category.id ? "active" : ""}`} onClick={() => setActiveCategory(category.id)}><span>{category.label}</span><small>{category.note}</small></button>)}</div>
          <div className="active-category-heading"><div><span className="category-kicker">{isSearching ? "resultado da busca" : `categoria ${String(categories.findIndex((category) => category.id === activeCategory) + 1).padStart(2, "0")}`}</span><h3>{isSearching ? `Resultados para “${search.trim()}”` : active.label}</h3><p>{isSearching ? "Produtos cadastrados encontrados no catálogo." : active.note}</p></div><span className="product-count">{visibleProducts.length} {visibleProducts.length === 1 ? "opção" : "opções"}</span></div>
          {visibleProducts.length === 0 ? <div className="empty-state">Nenhum produto encontrado. Tente outra busca.</div> : <div className="product-grid">{visibleProducts.map((product, index) => <article className={`product-card ${index === 0 ? "featured-card" : ""}`} key={product.id}>
            <div className="product-media">{product.image ? <img className={productImageClass(product)} src={product.image} alt="" /> : <div className="photo-slot"><ImageIcon size={22} /><span>Foto do produto</span><small>adicione sua imagem aqui</small></div>}<a className="product-media-whatsapp" href={`${WHATSAPP}?text=${encodeURIComponent(`Olá! Gostaria de consultar a disponibilidade de ${product.name}.`)}`} target="_blank" rel="noreferrer" aria-label={`Pedir ${product.name} pelo WhatsApp`} title="Pedir pelo WhatsApp"><MessageCircle size={16} /></a><span className="product-tag">{product.tags[0]}</span></div>
            <div className="product-content"><div className="product-subcategory">{product.subcategory}</div><h4>{product.name}</h4><p>{product.description}</p><div className="product-meta"><span>{product.size}</span><strong>{product.priceLabel ?? money(product.price)}</strong></div><div className="product-actions"><a className="whatsapp-card-button" href={`${WHATSAPP}?text=${encodeURIComponent(`Olá! Gostaria de consultar a disponibilidade de ${product.name}.`)}`} target="_blank" rel="noreferrer" aria-label={`Pedir ${product.name} pelo WhatsApp`}><MessageCircle size={17} /><span>Pedir pelo WhatsApp</span></a><button className="details-button" onClick={() => setSelected(product)}>Ver detalhes <ArrowRight size={15} /></button></div></div>
          </article>)}</div>}
        </section>

        <section id="como-pedir" className="process-section"><div className="container process-layout"><div className="process-intro"><p className="eyebrow">do desejo ao pedido</p><h2>Um caminho simples até a sua mesa.</h2><p>Escolha uma opção, confira o tamanho e a disponibilidade e fale com a gente pelo WhatsApp. A agenda é consultada caso a caso.</p><a className="primary-button" href={WHATSAPP} target="_blank" rel="noreferrer">Começar um pedido <MessageCircle size={17} /></a></div><div className="process-steps"><div className="process-step"><span>01</span><div><h3>Encontre sua ocasião</h3><p>Kits, presentes, festas ou eventos — comece pelo que você precisa.</p></div></div><div className="process-step"><span>02</span><div><h3>Confira as opções</h3><p>Veja tamanho, rendimento, composição e preço antes de chamar.</p></div></div><div className="process-step"><span>03</span><div><h3>Confirme com a gente</h3><p>Envie a data e o produto pelo WhatsApp para consultar a agenda.</p></div></div></div></div></section>

        <section id="entrega" className="info-section container"><div className="info-card info-card-large" style={{color: '#f3c7b4'}}><div className="info-icon" style={{color: '#f3c7b4'}}><MapPin size={22} style={{color: '#f3c7b4'}} /></div><div><p className="eyebrow" style={{color: '#f3c7b4'}}>retirada & entrega</p><h2 style={{color: '#f3c7b4'}}>Feito perto de você.</h2><p style={{color: '#f3c7b4'}}>Retirada no Trapiche da Barra. Entregas normalmente até o Pontal, Jatiúca e início da Cruz das Almas, e até Gruta de Lourdes na direção do Farol. A taxa é calculada conforme o endereço.</p></div></div><div className="info-card"><div className="info-icon"><Clock3 size={22} /></div><div><p className="eyebrow">agenda</p><h3>Consulte antes de fechar</h3><p>Podemos ter disponibilidade no mesmo dia ou precisar de 24 a 48 horas. A confirmação depende da agenda.</p></div></div><div className="info-card"><div className="info-icon"><Check size={22} /></div><div><p className="eyebrow">pagamento</p><h3>Pix ou cartão</h3><p>50% no ato da encomenda e 50% no ato da entrega.</p></div></div></section>
      </main>

      <footer className="site-footer" style={{ backgroundColor: '#f3c7b4', color: '#6f1710' }}><div className="container footer-inner"><div className="brand-lockup footer-brand"><img className="brand-logo footer-logo" src="/images/arte-em-familia-logo.png" alt="Arte em Família — Confeitaria Afetiva" /></div><div className="footer-copy"><p style={{ color: '#6f1710' }}>Confeitaria artesanal para momentos que ficam.</p><a href="https://www.instagram.com/arteemfamilia_/" target="_blank" rel="noreferrer" style={{ color: '#6f1710' }}><Instagram size={15} /> @arteemfamilia_</a></div><a className="footer-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer" style={{ color: '#6f1710', borderColor: '#6f1710' }}>Pedir pelo WhatsApp <ArrowRight size={16} /></a></div></footer>

      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="product-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Fechar"><X size={18} /></button><div className="modal-media">{selected.images?.length ? <div className="modal-gallery">{selected.images.map((image, index) => <img className={selected.id === "doces-014" ? "modal-image-zoom-in" : selected.id === "doces-016" ? "modal-image-zoom-out" : ""} key={`${selected.id}-${index}`} src={image} alt={`${selected.name} — foto ${index + 1}`} />)}</div> : selected.image ? <img className={productImageClass(selected)} src={selected.image} alt={selected.name} /> : <div className="photo-slot"><ImageIcon size={22} /><span>Foto do produto</span></div>}</div><div className="modal-body"><span className="product-subcategory">{selected.subcategory}</span><h2>{selected.name}</h2><p>{selected.description}{selected.name.startsWith("Bento Cake") && !selected.description.endsWith(".") ? "." : ""}</p>{selected.name.startsWith("Bento Cake") ? <div className="modal-details"><p className="details-heading">Escolha sua combinação</p><div className="bento-options"><div><strong>Massas</strong><ul><li>Tradicional</li><li>Baunilha</li><li>Chocolate</li><li>Mista</li></ul></div><div><strong>Recheios</strong><ul><li>Brigadeiro</li><li>Leitinho</li><li>Doce de leite</li><li>Beijinho</li><li>Crocante</li></ul></div></div></div> : detailItems(selected).length > 0 ? <div className="modal-details"><p className="details-heading">{selected.name.startsWith("Kit Festa") ? "Composição do kit" : "Detalhes do produto"}</p><ul>{detailItems(selected).map((item) => <li key={item}>{item}</li>)}</ul></div> : null}{selected.observation && <p className="modal-observation"><strong>Observação:</strong> {selected.observation}</p>}<div className="modal-price"><span>{selected.size}</span><strong>{selected.priceLabel ?? money(selected.price)}</strong></div><p className="modal-note">Disponibilidade conforme agenda. Envie a data do evento e a opção escolhida para confirmar pelo WhatsApp.</p><a className="primary-button full-button" href={`${WHATSAPP}?text=${encodeURIComponent(`Olá! Gostaria de consultar a disponibilidade de ${selected.name}.`)}`} target="_blank" rel="noreferrer">Consultar no WhatsApp <MessageCircle size={17} /></a></div></div></div>}
    </div>
  );
}
