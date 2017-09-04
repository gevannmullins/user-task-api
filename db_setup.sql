CREATE DATABASE IF NOT EXISTS `users_tasks` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `users_tasks`;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `date_time` varchar(255) DEFAULT NULL,
  `next_execute_date_time` varchar(255) DEFAULT NULL,
  `pending` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `description`, `date_time`, `next_execute_date_time`, `status`, `user_id`) VALUES
(1, 'task1', 'describing task1', '2016-05-25 14:25:00', '', 1, 1),
(2, 'tasking1', 'describing task1', '2016-05-25 14:25:00', '', 1, 1),
(3, 'task2', 'again task2', '2016-05-25 14:25:00', '', 1, 2),
(4, 'testTask', 'this is the test description', '2016-05-25 14:25:00', '', 1, 3),
(5, 'testTask', 'this is the test description', '2016-05-25 14:25:00', '', 1, 4),
(6, 'testTask', 'this is the test description', '2016-05-25 14:25:00', '', 1, 5),
(7, 'testTask', 'this is the test description', '2016-05-25 14:25:00', '', 1, 5),
(8, 'testTask', 'this is the test description', '2016-05-25 14:25:00', '', 1, 6),
(9, 'testTask', 'this is the test description', '2016-05-25 14:25:00', '', 1, 7),
(10, 'testTask', 'this is the test description', '2016-05-25 14:25:00', '', 1, 4),
(11, 'testTask', 'this is the test description', '2016-05-25 14:25:00', '', 1, 7),
(12, 'testTask', 'this is the test description', '2016-05-25 14:25:00', '', 1, 1),
(13, 'testTask', 'this is the test description', '2016-05-25 14:25:00', '', 1, 2),
(14, 'testTask', 'this is the test description', '2016-05-25 14:25:00', '', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
