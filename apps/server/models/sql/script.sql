--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1)

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
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(25) NOT NULL,
    is_active boolean DEFAULT false,
    user_id uuid
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expenses (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    amount double precision NOT NULL,
    date date DEFAULT CURRENT_DATE,
    description text,
    reccuring boolean DEFAULT false,
    receipt_upload character varying(100),
    creation_date date DEFAULT CURRENT_DATE,
    start_date date DEFAULT CURRENT_DATE,
    end_date date,
    user_id uuid NOT NULL,
    CONSTRAINT expense_check CHECK ((end_date > start_date))
);


ALTER TABLE public.expenses OWNER TO postgres;

--
-- Name: expenses_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expenses_category (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    expense_id uuid NOT NULL,
    category_id uuid NOT NULL
);


ALTER TABLE public.expenses_category OWNER TO postgres;

--
-- Name: incomes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.incomes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    amount double precision NOT NULL,
    date date NOT NULL,
    source character varying(30) NOT NULL,
    description text,
    creation_date date DEFAULT CURRENT_DATE,
    user_id uuid NOT NULL
);


ALTER TABLE public.incomes OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(70) NOT NULL,
    creation_date date DEFAULT CURRENT_DATE,
    first_name character varying(20),
    last_name character varying(35)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name, is_active, user_id) FROM stdin;
cf0a72b6-0034-4e79-833b-63b192075bd2	utilities	f	\N
372e9c4d-fa66-487b-86c9-2ca85991538b	gaming	t	fe62cf38-bbd1-46e8-9a95-2a90b7e49721
b38e5ed4-51b8-410b-9635-3cdd6e144936	gaming	t	54a23c52-39f9-4cdc-bbe7-689fb964aba8
8636bc2e-6b9a-465b-b893-6cc2f2370b8f	food	t	fe62cf38-bbd1-46e8-9a95-2a90b7e49721
8a8c3fb9-dd6b-45f7-a4ad-74a95de7caac	other	t	fe62cf38-bbd1-46e8-9a95-2a90b7e49721
7d5d1c60-9d8c-4d77-8c74-6b3b3d58536d	studies	f	\N
\.


--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expenses (id, amount, date, description, reccuring, receipt_upload, creation_date, start_date, end_date, user_id) FROM stdin;
817dca66-629d-41c7-b4fa-09023498b636	40000	2025-09-05	gaming mouse	f	\N	2025-09-06	\N	\N	54a23c52-39f9-4cdc-bbe7-689fb964aba8
0b16ca0c-6e8a-4bec-bd63-0895354e5a07	120000	2025-09-05	gaming keyboard	f	\N	2025-09-06	\N	\N	fe62cf38-bbd1-46e8-9a95-2a90b7e49721
c7129338-dfb3-4a95-a46f-b7d4ca1ac690	50000	2025-09-05	restaurant	f	http://localhost/uploads/receipt.pdf	2025-09-06	\N	\N	fe62cf38-bbd1-46e8-9a95-2a90b7e49721
f70e5730-c158-4cfb-81c3-68dd0e559475	12000	2025-09-06	Abonnement Spotify	t	\N	2025-09-06	2025-01-01	2025-12-31	fe62cf38-bbd1-46e8-9a95-2a90b7e49721
6bdb9a60-ec48-41fb-83ff-55f448d8fec3	25000	2025-09-06	Abonnement netflix	t	\N	2025-09-06	2025-01-01	\N	fe62cf38-bbd1-46e8-9a95-2a90b7e49721
9adb9734-2d38-4b0b-b550-01d43ebc334a	22000	2025-09-05	game pass	f	\N	2025-09-06	\N	\N	fe62cf38-bbd1-46e8-9a95-2a90b7e49721
\.


--
-- Data for Name: expenses_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expenses_category (id, expense_id, category_id) FROM stdin;
526ff137-720a-4d1b-ab98-9ac268d53e93	c7129338-dfb3-4a95-a46f-b7d4ca1ac690	8636bc2e-6b9a-465b-b893-6cc2f2370b8f
409d1cd9-6978-4c84-a210-f407ec14ff60	f70e5730-c158-4cfb-81c3-68dd0e559475	8a8c3fb9-dd6b-45f7-a4ad-74a95de7caac
69c51b41-b365-49ac-a787-dd242f94f840	0b16ca0c-6e8a-4bec-bd63-0895354e5a07	372e9c4d-fa66-487b-86c9-2ca85991538b
5c159fda-7eca-43a5-8227-bb4f636d3052	817dca66-629d-41c7-b4fa-09023498b636	b38e5ed4-51b8-410b-9635-3cdd6e144936
a8cc46cc-3cf4-4ab7-bbdb-04a770bf8df0	9adb9734-2d38-4b0b-b550-01d43ebc334a	372e9c4d-fa66-487b-86c9-2ca85991538b
\.


--
-- Data for Name: incomes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.incomes (id, amount, date, source, description, creation_date, user_id) FROM stdin;
939d0390-1cac-4e86-afa6-d8ef35d861be	2500	2025-09-01	Salaire	Salaire mensuel de septembre	2025-09-07	fe62cf38-bbd1-46e8-9a95-2a90b7e49721
ac9af211-8f9e-44b7-8968-989380d2a890	300	2025-09-05	Freelance	Développement site web	2025-09-07	fe62cf38-bbd1-46e8-9a95-2a90b7e49721
2e83be19-52f2-4084-ab31-d1e60496e0b1	150	2025-09-07	Cadeau	Anniversaire offert par un ami	2025-09-07	fe62cf38-bbd1-46e8-9a95-2a90b7e49721
dbc8a07a-64d3-4692-8f4f-9030b94271fa	80	2025-09-07	Vente	Vente d’articles sur eBay	2025-09-07	fe62cf38-bbd1-46e8-9a95-2a90b7e49721
dcab22de-1cdd-476d-b3c1-363c95b32aed	1200	2025-08-28	Investissement	\N	2025-09-07	fe62cf38-bbd1-46e8-9a95-2a90b7e49721
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, creation_date, first_name, last_name) FROM stdin;
58c3e59f-412f-409b-aa4d-06fa2bc649e2	john@example.com	$2b$11$QgHqDVcpuQg8grfuePWhRez8tjAzSfSQ5qAZFfSY1QSXx.jIx5nDa	2025-09-03	\N	\N
f7ba3214-fce3-46e2-8272-53592ce95ea1	alice@example.com	$2b$15$7KkRoPByMp8qSMU/dD6Bx.R77Q0aNjOqYTfuAC4nc1WPQeODOcLna	2025-09-03	\N	\N
54a23c52-39f9-4cdc-bbe7-689fb964aba8	bob@example.com	$2b$15$1E8qNDcy0kHlBYTJOp9tq.Aw2JgzeObcnLrFNx/hcZPJmjXeTjQFO	2025-09-03	\N	\N
fe62cf38-bbd1-46e8-9a95-2a90b7e49721	e.andrianombana@protonmail.com	$2b$15$LlgAz6dQOngeZfFPjq/LuumCfpxQPD2Ppvzt3qwNapua.tBXUOgfq	2025-09-07	\N	\N
\.


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: expenses expense_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expense_pkey PRIMARY KEY (id);


--
-- Name: expenses_category expenses_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses_category
    ADD CONSTRAINT expenses_category_pkey PRIMARY KEY (id);


--
-- Name: incomes income_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.incomes
    ADD CONSTRAINT income_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: user_expense_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_expense_index ON public.expenses USING btree (user_id);


--
-- Name: expenses_category fk_category_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses_category
    ADD CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: expenses_category fk_expense_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses_category
    ADD CONSTRAINT fk_expense_id FOREIGN KEY (expense_id) REFERENCES public.expenses(id);


--
-- Name: expenses fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: incomes fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.incomes
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: TABLE category; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.category TO admin;


--
-- Name: TABLE expenses; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.expenses TO admin;


--
-- Name: TABLE expenses_category; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.expenses_category TO admin;


--
-- Name: TABLE incomes; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.incomes TO admin;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.users TO admin;


--
-- PostgreSQL database dump complete
--

