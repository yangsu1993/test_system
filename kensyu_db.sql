-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2021-04-24 04:42:03
-- サーバのバージョン： 10.4.18-MariaDB
-- PHP のバージョン: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `kensyu_db`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `pushin`
--

CREATE TABLE `pushin` (
  `id` varchar(255) NOT NULL,
  `names` varchar(255) NOT NULL,
  `furigana` varchar(255) NOT NULL,
  `join_date` varchar(10) NOT NULL,
  `get_cre` varchar(255) NOT NULL,
  `cre_date` varchar(10) NOT NULL,
  `bonus_date` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `pushin`
--

INSERT INTO `pushin` (`id`, `names`, `furigana`, `join_date`, `get_cre`, `cre_date`, `bonus_date`) VALUES
('swe3rw', '山口', 'ヤマノテ', '2021-04-22', 'assss', '2021-04-09', ''),
('TJ23413413', 'やり直し', 'ヤリ', '2021-04-05', '', '', ''),
('TJ1234323q2', 'やり直し', 'ヤリ', '2021-04-13', '', '', ''),
('TJ', 'やり直し', 'ヤリ', '2021-04-12', '', '', ''),
('TJ111111', '山本', 'ヤリ', '2021-04-23', '', '', ''),
('TJ000100', '山本', 'ヤマモト', '2021-04-05', '', '', ''),
('TJ222222', '山本', 'ヤマモト', '2021-04-23', '', '', ''),
('TJ11111', '山本', 'ヤマモト', '2021-04-05', '', '', '');

-- --------------------------------------------------------

--
-- テーブルの構造 `user`
--

CREATE TABLE `user` (
  `userName` varchar(255) NOT NULL,
  `userPass` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `user`
--

INSERT INTO `user` (`userName`, `userPass`) VALUES
('1', '123456'),
('5', '123456'),
('11111', '11111'),
('yang', '222222'),
('hu', 'huhuhu'),
('yang1', 'wwwwww'),
('23d', 'wwwwww');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
