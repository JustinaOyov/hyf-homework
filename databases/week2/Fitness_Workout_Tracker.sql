/*--------------------------------------------*/
 -- Project: Fitness_Workout_Tracker DB Schema 
/*--------------------------------------------*/

/* Create DB Schema: 'fitness_db'  - if not exist */
CREATE SCHEMA IF NOT EXISTS `fitness_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci ;
USE `fitness_db` ;

/* 
  Create table: 'exercises' - holds list of various exercises 
*/
CREATE TABLE IF NOT EXISTS `fitness_db`.`exercises` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `exercise_name` VARCHAR(255) NOT NULL,
  `exercise_description` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `exercises_name_UNIQUE` (`exercise_name` ASC) VISIBLE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci;

/* 
  Create  table: 'workouts' 
  - holds list of workout types e.g cardio, strength, yoga etc.. 
*/
CREATE TABLE IF NOT EXISTS `fitness_db`.`workouts` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `workout_type` VARCHAR(255) NOT NULL,
  `workout_description` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `workout_type_UNIQUE` (`workout_type` ASC) VISIBLE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci;

/* 
  Create table: 'users' - holds user information 
*/
CREATE TABLE IF NOT EXISTS `fitness_db`.`users` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'user id',
  `first_name` VARCHAR(45) NOT NULL COMMENT 'Holds user first name',
  `last_name` VARCHAR(45) NOT NULL COMMENT 'Holds user last name',
  `gender` VARCHAR(1) NOT NULL COMMENT 'Possible values:\nM = Male\nF = Female',
  `dob` DATETIME NULL DEFAULT NULL COMMENT 'Holds user date of birth',
  `phone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `weight(kg)` INT(10) UNSIGNED NOT NULL COMMENT 'Holds user body weight',
  `height(cm)` INT(10) UNSIGNED NOT NULL COMMENT 'Holds user body height',
  PRIMARY KEY (`id`),
  INDEX `first_name` (`first_name` ASC) INVISIBLE,
  INDEX `last_name` (`last_name` ASC) VISIBLE,
  INDEX `gender` (`gender` ASC) VISIBLE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci;

/* 
  Create table: 'user_workout_exercises'  
  - details user custome workout exercises & target to be achieved  
*/ 
CREATE TABLE IF NOT EXISTS `fitness_db`.`user_workout_exercises` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_workout_routine_id` INT(10) UNSIGNED NOT NULL,
  `workouts_exercises_id` INT(10) UNSIGNED NOT NULL,
  `weights` INT(10) UNSIGNED NULL DEFAULT NULL COMMENT 'exercise target: weight',
  `num_sets` INT(10) UNSIGNED NULL DEFAULT NULL COMMENT 'exercise target: number of sets',
  `num_reps` INT(10) UNSIGNED NULL DEFAULT NULL COMMENT 'exercise target: number of reps per set',
  `time` INT(10) UNSIGNED NULL DEFAULT NULL COMMENT 'exercise target: time',
  PRIMARY KEY (`id`, `user_workout_routine_id`, `workouts_exercises_id`),
  INDEX `fk_user_workout_exercises_workouts_exercises1_idx` (`workouts_exercises_id` ASC) INVISIBLE,
  INDEX `fk_user_workout_exercises_user_workout_routine1_idx` (`user_workout_routine_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_workout_exercises_workouts_exercises1` FOREIGN KEY (`workouts_exercises_id`) 
	REFERENCES `fitness_db`.`workouts_exercises` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_workout_exercises_user_workout_routine1` FOREIGN KEY (`user_workout_routine_id`) 
	REFERENCES `fitness_db`.`user_workout_routine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci;


/* 
  Create table: 'workout_exercises'  
  - list which exercises are part of which workout 
  e.g cardio (rowing, jumping etc..), strength(bench_press, squat, dead_lift etc..) 
*/
CREATE TABLE IF NOT EXISTS `fitness_db`.`workouts_exercises` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `workout_id` INT(10) UNSIGNED NOT NULL,
  `exercise_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `workout_id`, `exercise_id`),
  INDEX `fk_workouts_exercises_workouts1_idx` (`workout_id` ASC) VISIBLE,
  INDEX `fk_workouts_exercises_exercises1_idx` (`exercise_id` ASC) VISIBLE,
  CONSTRAINT `fk_workouts_exercises_workouts1` FOREIGN KEY (`workout_id`) REFERENCES `fitness_db`.`workouts` (`id`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_workouts_exercises_exercises1` FOREIGN KEY (`exercise_id`) REFERENCES `fitness_db`.`exercises` (`id`) 
	ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci;

/* 
  Create table : 'user_workout_routine'  
  - details user custome workout plan to be performed  
*/
CREATE TABLE IF NOT EXISTS `fitness_db`.`user_workout_routine` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT(10) UNSIGNED NOT NULL,
  `workout_id` INT(10) UNSIGNED NOT NULL,
  `days_per_week` INT(10) UNSIGNED NOT NULL COMMENT 'Number of days to workout per week',
  `time_per_workout` INT(10) UNSIGNED NOT NULL COMMENT 'Time duration per workout',
  `description` VARCHAR(255) NULL DEFAULT NULL COMMENT 'Workout description',
  `date_created` DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'The timestamp this record was created',
  `date_modified` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
	COMMENT 'The timestamp this record was modified or updated',
  PRIMARY KEY (`id`, `user_id`, `workout_id`),
  INDEX `fk_user_workout_routine_users1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_user_workout_routine_workouts1_idx` (`workout_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_workout_routine_users1` FOREIGN KEY (`user_id`) REFERENCES `fitness_db`.`users` (`id`) 
	ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_workout_routine_workouts1` FOREIGN KEY (`workout_id`) REFERENCES `fitness_db`.`workouts` (`id`) 
	ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci;

/* 
  Create table: 'user_workout_log' 
  - logs each workout exercise performed and target achieved
*/ 
CREATE TABLE IF NOT EXISTS `fitness_db`.`user_workout_log` (
  `log_id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `workout_date` DATETIME NULL DEFAULT NULL COMMENT 'The date workout was performed',
  `user_workout_exercises_id` INT(10) UNSIGNED NOT NULL,
  `weights` INT(10) UNSIGNED NULL DEFAULT NULL COMMENT 'The weights achieved',
  `sets` INT(10) UNSIGNED NULL DEFAULT NULL COMMENT 'The number of sets achieved per workout',
  `reps` INT(10) UNSIGNED NULL DEFAULT NULL COMMENT 'The number of reps achieved per set',
  `time` INT(10) UNSIGNED NULL DEFAULT NULL COMMENT 'The total time achieved per workout',
  PRIMARY KEY (`log_id`, `user_workout_exercises_id`),
  INDEX `workout_date` (`workout_date` ASC) VISIBLE,
  INDEX `fk_user_workout_log_user_workout_exercises1_idx` (`user_workout_exercises_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_workout_log_user_workout_exercises1` FOREIGN KEY (`user_workout_exercises_id`) 
	REFERENCES `fitness_db`.`user_workout_exercises` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci;




SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
