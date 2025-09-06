--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1)
CREATE DATABASE expense_management;
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
    expense_id uuid
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
-- Name: incomes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.incomes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    amount double precision NOT NULL,
    date date,
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

COPY public.category (id, name, is_active, expense_id) FROM stdin;
80c5c1c7-8a9f-43e2-82de-2e0f79e6a047	other	f	\N
cf0a72b6-0034-4e79-833b-63b192075bd2	utilities	f	\N
\.


--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expenses (id, amount, date, description, reccuring, receipt_upload, creation_date, start_date, end_date, user_id) FROM stdin;
f70e5730-c158-4cfb-81c3-68dd0e559475	12000	2025-09-06	Abonnement Spotify	t	\N	2025-09-06	2025-01-01	2025-12-31	67d921c7-b7d1-4d41-bebd-019a7e7d77d7
6bdb9a60-ec48-41fb-83ff-55f448d8fec3	25000	2025-09-06	Abonnement netflix	t	\N	2025-09-06	2025-01-01	\N	67d921c7-b7d1-4d41-bebd-019a7e7d77d7
0b16ca0c-6e8a-4bec-bd63-0895354e5a07	120000	2025-09-05	gaming keyboard	f	\N	2025-09-06	\N	\N	67d921c7-b7d1-4d41-bebd-019a7e7d77d7
c7129338-dfb3-4a95-a46f-b7d4ca1ac690	50000	2025-09-05	restaurant	f	http://localhost/uploads/receipt.pdf	2025-09-06	\N	\N	67d921c7-b7d1-4d41-bebd-019a7e7d77d7
9adb9734-2d38-4b0b-b550-01d43ebc334a	22000	2025-09-05	game pass	f	\N	2025-09-06	\N	\N	67d921c7-b7d1-4d41-bebd-019a7e7d77d7
817dca66-629d-41c7-b4fa-09023498b636	40000	2025-09-05	gaming mouse	f	\N	2025-09-06	\N	\N	54a23c52-39f9-4cdc-bbe7-689fb964aba8
\.


--
-- Data for Name: incomes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.incomes (id, amount, date, source, description, creation_date, user_id) FROM stdin;
f6f76718-7634-4fa8-962d-93c76e0c44b3	25000	2025-06-15	test 3	\N	2025-09-04	67d921c7-b7d1-4d41-bebd-019a7e7d77d7
e62c7886-d388-4c88-9085-d190e3587e3d	35000	2025-06-15	test 5	\N	2025-09-04	67d921c7-b7d1-4d41-bebd-019a7e7d77d7
e5f93073-eeff-470a-bbc0-1a345c5b28e9	5000	2025-11-15	updating data	test	2025-09-04	67d921c7-b7d1-4d41-bebd-019a7e7d77d7
8fea2e7b-ee00-45ff-bd6d-5ed64d51d2d5	120000	2025-06-15	updating data 2	test updating data 2	2025-09-04	67d921c7-b7d1-4d41-bebd-019a7e7d77d7
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, creation_date, first_name, last_name) FROM stdin;
58c3e59f-412f-409b-aa4d-06fa2bc649e2	john@example.com	$2b$11$QgHqDVcpuQg8grfuePWhRez8tjAzSfSQ5qAZFfSY1QSXx.jIx5nDa	2025-09-03	\N	\N
f7ba3214-fce3-46e2-8272-53592ce95ea1	alice@example.com	$2b$15$7KkRoPByMp8qSMU/dD6Bx.R77Q0aNjOqYTfuAC4nc1WPQeODOcLna	2025-09-03	\N	\N
54a23c52-39f9-4cdc-bbe7-689fb964aba8	bob@example.com	$2b$15$1E8qNDcy0kHlBYTJOp9tq.Aw2JgzeObcnLrFNx/hcZPJmjXeTjQFO	2025-09-03	\N	\N
67d921c7-b7d1-4d41-bebd-019a7e7d77d7	test@gmail.com	$2b$15$zrDtKUgiQLBrsWa.h1mErOV8ZRuUxBx6fKz6CfRDSpZhWRtK7YUiq	2025-09-04	\N	\N
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
-- Name: category fk_expense_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT fk_expense_id FOREIGN KEY (expense_id) REFERENCES public.expenses(id) ON DELETE CASCADE;


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

