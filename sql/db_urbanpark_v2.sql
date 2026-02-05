-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04/02/2026 às 22:43
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_urbanpark_v2`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `estacionamento`
--

CREATE TABLE `estacionamento` (
  `id` int(11) NOT NULL,
  `veiculo_id` int(11) NOT NULL,
  `vaga_id` int(11) NOT NULL,
  `entrada` datetime DEFAULT current_timestamp(),
  `saida` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `estacionamento`
--

INSERT INTO `estacionamento` (`id`, `veiculo_id`, `vaga_id`, `entrada`, `saida`) VALUES
(1, 1, 1, '2026-02-04 18:42:02', NULL),
(2, 2, 13, '2026-02-04 18:42:17', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `vagas`
--

CREATE TABLE `vagas` (
  `id` int(11) NOT NULL,
  `setor` char(1) NOT NULL,
  `numero` int(11) NOT NULL,
  `status` enum('disponivel','ocupado') DEFAULT 'disponivel'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `vagas`
--

INSERT INTO `vagas` (`id`, `setor`, `numero`, `status`) VALUES
(1, 'A', 1, 'ocupado'),
(2, 'A', 2, 'disponivel'),
(3, 'A', 3, 'disponivel'),
(4, 'A', 4, 'disponivel'),
(5, 'B', 5, 'disponivel'),
(6, 'B', 6, 'disponivel'),
(7, 'B', 7, 'disponivel'),
(8, 'B', 8, 'disponivel'),
(9, 'C', 9, 'disponivel'),
(10, 'C', 10, 'disponivel'),
(11, 'C', 11, 'disponivel'),
(12, 'C', 12, 'disponivel'),
(13, 'D', 13, 'ocupado'),
(14, 'D', 14, 'disponivel'),
(15, 'D', 15, 'disponivel'),
(16, 'D', 16, 'disponivel');

-- --------------------------------------------------------

--
-- Estrutura para tabela `veiculos`
--

CREATE TABLE `veiculos` (
  `id` int(11) NOT NULL,
  `tipo` enum('carro','moto') NOT NULL,
  `placa` varchar(8) NOT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `cor` varchar(50) DEFAULT NULL,
  `data_entrada` datetime DEFAULT NULL,
  `data_saida` datetime DEFAULT NULL,
  `status` enum('ativo','finalizado') DEFAULT 'ativo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `veiculos`
--

INSERT INTO `veiculos` (`id`, `tipo`, `placa`, `modelo`, `cor`, `data_entrada`, `data_saida`, `status`) VALUES
(1, 'carro', 'ABC-1232', 'Yamaha', 'Vermelha', NULL, NULL, 'ativo'),
(2, 'moto', 'ABC-1222', 'Yamaha', 'Vermelha', NULL, NULL, 'ativo');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `estacionamento`
--
ALTER TABLE `estacionamento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_estacionamento_veiculo` (`veiculo_id`),
  ADD KEY `fk_estacionamento_vaga` (`vaga_id`);

--
-- Índices de tabela `vagas`
--
ALTER TABLE `vagas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `veiculos`
--
ALTER TABLE `veiculos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `estacionamento`
--
ALTER TABLE `estacionamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `vagas`
--
ALTER TABLE `vagas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `veiculos`
--
ALTER TABLE `veiculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `estacionamento`
--
ALTER TABLE `estacionamento`
  ADD CONSTRAINT `fk_estacionamento_vaga` FOREIGN KEY (`vaga_id`) REFERENCES `vagas` (`id`),
  ADD CONSTRAINT `fk_estacionamento_veiculo` FOREIGN KEY (`veiculo_id`) REFERENCES `veiculos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
