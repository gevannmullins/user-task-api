CREATE DATABASE IF NOT EXISTS `users_tasks` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `users_tasks`;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `date_time` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `description`, `date_time`, `user_id`) VALUES
(2, 'tas1', 'describing task1', '2016-05-25 14:25:00', 1),
(3, 'task2', 'again task2', '2016-05-25 14:25:00', 2),
(4, 'testTask', 'this is the test description', '2016-05-25 14:25:00', 3),
(5, 'testTask', 'this is the test description', '2016-05-25 14:25:00', 4),
(6, 'testTask', 'this is the test description', '2016-05-25 14:25:00', 5),
(7, 'testTask', 'this is the test description', '2016-05-25 14:25:00', 5),
(8, 'testTask', 'this is the test description', '2016-05-25 14:25:00', 6),
(9, 'testTask', 'this is the test description', '2016-05-25 14:25:00', 7),
(10, 'testTask', 'this is the test description', '2016-05-25 14:25:00', 4),
(11, 'testTask', 'this is the test description', '2016-05-25 14:25:00', 7),
(12, 'testTask', 'this is the test description', '2016-05-25 14:25:00', 1),
(13, 'testTask', 'this is the test description', '2016-05-25 14:25:00', 2),
(14, 'testTask', 'this is the test description', '2016-05-25 14:25:00', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `first_name`, `last_name`) VALUES
  (1, 'gevannmullins', 'Gevann', 'Mullins'),
  (2, 'mullinsjen', 'Jenna', 'Mullins'),
  (3, 'juangevanloed', 'Juan', 'Loadick'),
  (4, 'brandonjacobs', 'Brandon', 'Jacobs'),
  (5, 'brownannie', 'Anne', 'Brown'),
  (6, 'nickyminaj', 'Nicky', 'Minaj'),
  (7, 'drakeblake', 'Blake', 'Drake')
;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
