--
-- PostgreSQL database dump
--

\restrict khUNMDichoZSJNmYT0X7azJbJi4UEglsvDrvrmqn6UK79hukVGtypGsiM2vwAoe

-- Dumped from database version 17.10 (Debian 17.10-1.pgdg13+1)
-- Dumped by pg_dump version 17.10 (Debian 17.10-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.category OWNER TO admin;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO admin;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO admin;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO admin;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: order; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    "totalPrice" numeric NOT NULL,
    address text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."order" OWNER TO admin;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_id_seq OWNER TO admin;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- Name: order_product; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.order_product (
    id integer NOT NULL,
    quantity integer NOT NULL,
    "orderId" integer,
    "productId" integer
);


ALTER TABLE public.order_product OWNER TO admin;

--
-- Name: order_product_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.order_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_product_id_seq OWNER TO admin;

--
-- Name: order_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.order_product_id_seq OWNED BY public.order_product.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying NOT NULL,
    price double precision NOT NULL,
    quantity integer NOT NULL,
    description text,
    discount integer DEFAULT 0 NOT NULL,
    color character varying DEFAULT 'Белый'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.product OWNER TO admin;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_id_seq OWNER TO admin;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO admin;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO admin;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: order id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: order_product id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.order_product ALTER COLUMN id SET DEFAULT nextval('public.order_product_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.category (id, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1785756277013	ReadiesTables1785756277013
3	1785762637282	AddIsActiveToProduct1785762637282
6	1785765425936	CreateCategory1785765425936
7	1785828985069	AddUserTable1785828985069
8	1785836761606	AddUniqueToUser1785836761606
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."order" (id, "totalPrice", address, "createdAt", "updatedAt") FROM stdin;
1	6100000	\N	2026-08-03 10:43:43.494079	2026-08-03 10:43:43.494079
2	31600000	Tashkent, Olmazor district	2026-08-05 07:06:00.496901	2026-08-05 07:06:00.496901
\.


--
-- Data for Name: order_product; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.order_product (id, quantity, "orderId", "productId") FROM stdin;
1	1	1	1
2	1	1	3
3	2	2	1
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.product (id, name, price, quantity, description, discount, color, "createdAt", "updatedAt", is_active) FROM stdin;
1	Apple Watch Series 11	6000000	100	Hовейшие умные часы Apple, сочетающие стильный дизайн, высокую производительность и расширенные функции для здоровья. Они оснащены ярким OLED-дисплеем, обеспечивают круглосуточный мониторинг пульса, сна и физической активности, поддерживают ЭКГ, отслеживание тренировок, GPS и тесную интеграцию с экосистемой Apple. Улучшенная автономность и новые возможности watchOS делают их отличным выбором для повседневного использования и занятий спортом.	0	Белый	2026-08-03 11:38:38.903961	2026-08-03 11:38:38.903961	t
2	Iphone 17 pro max	18000000	57	Phone 17 Pro Max — флагманский смартфон Apple с 6,9-дюймовым OLED-дисплеем ProMotion (120 Гц), чипом A19 Pro, улучшенной системой камер профессионального уровня и длительным временем автономной работы. Подходит для фото- и видеосъёмки, игр и повседневного использования.	0	Белый	2026-08-03 11:40:21.827388	2026-08-03 11:44:11.375814	t
3	MacBook Air M5	14400000	45	Hовейший ноутбук Apple с мощным чипом M5, тонким и лёгким корпусом, ярким дисплеем Liquid Retina, длительным временем автономной работы и высокой производительностью для учёбы, работы и творчества.	10	Белый	2026-08-03 11:46:37.113894	2026-08-03 11:47:14.791939	t
4	Ipad	13500000	38	Hовейший ноутбук Apple с мощным чипом M5, тонким и лёгким корпусом, ярким дисплеем Liquid Retina, длительным временем автономной работы и высокой производительностью для учёбы, работы и творчества.	5	Белый	2026-08-03 13:32:08.1894	2026-08-03 13:32:08.1894	t
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."user" (id, username, email, password) FROM stdin;
11	mirafzalov	mir416@gmail.com	$argon2id$v=19$m=65536,p=4,t=3$xmqkELP7haSGtL2nieCKyw$TAAUJwqxS5xxMhMe328B5KHa2m1yMCpriuYS1/U0DiY
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.category_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.migrations_id_seq', 8, true);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.order_id_seq', 2, true);


--
-- Name: order_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.order_product_id_seq', 3, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.product_id_seq', 4, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.user_id_seq', 11, true);


--
-- Name: order PK_1031171c13130102495201e3e20; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);


--
-- Name: order_product PK_539ede39e518562dfdadfddb492; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT "PK_539ede39e518562dfdadfddb492" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: order_product FK_073c85ed133e05241040bd70f02; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT "FK_073c85ed133e05241040bd70f02" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- Name: order_product FK_3fb066240db56c9558a91139431; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.order_product
    ADD CONSTRAINT "FK_3fb066240db56c9558a91139431" FOREIGN KEY ("orderId") REFERENCES public."order"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict khUNMDichoZSJNmYT0X7azJbJi4UEglsvDrvrmqn6UK79hukVGtypGsiM2vwAoe

