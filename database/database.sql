DROP TABLE IF EXISTS "answers";
DROP TABLE IF EXISTS "riddles";
DROP TABLE IF EXISTS "users";

CREATE TABLE "users"(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nickname" VARCHAR(50) UNIQUE,
    "score" INTEGER DEFAULT 0,
    "password" VARCHAR(100),
    "salt" VARCHAR(50)
);

INSERT INTO "users" ("nickname", "score", "password", "salt" )
VALUES ('Marco', 2, '4f4ddf209c25461b39d42663cf5ccfbf65644e68fd759c198892cc998cb66c27784c1d978a1bf5c7cfc2807de5404cd189e62f44d3b9b5d91c0b285ac938fc63', 'aloo'),
 ('Khusniddin', 6, '4f4ddf209c25461b39d42663cf5ccfbf65644e68fd759c198892cc998cb66c27784c1d978a1bf5c7cfc2807de5404cd189e62f44d3b9b5d91c0b285ac938fc63', 'aloo'),
 ('Gab', 2, '4f4ddf209c25461b39d42663cf5ccfbf65644e68fd759c198892cc998cb66c27784c1d978a1bf5c7cfc2807de5404cd189e62f44d3b9b5d91c0b285ac938fc63', 'aloo'),
 ('Mario', 0, '4f4ddf209c25461b39d42663cf5ccfbf65644e68fd759c198892cc998cb66c27784c1d978a1bf5c7cfc2807de5404cd189e62f44d3b9b5d91c0b285ac938fc63', 'aloo'),
 ('Luigi', 0, '4f4ddf209c25461b39d42663cf5ccfbf65644e68fd759c198892cc998cb66c27784c1d978a1bf5c7cfc2807de5404cd189e62f44d3b9b5d91c0b285ac938fc63', 'aloo');

CREATE TABLE "riddles"(
                "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                "text" TEXT NOT NULL,
                "duration" INTEGER NOT NULL,
                "level"   INTEGER CHECK( "level" IN (3, 2, 1) ) DEFAULT 1,
                "hint1" TEXT NOT NULL,
                "hint2" TEXT NOT NULL,
                "correct_response" TEXT NOT NULL,
                "correct_response_at" TEXT NULL,
                "first_response_at" TEXT NULL,
                "created_at" TEXT NOT NULL,
                "status" BOOLEAN DEFAULT 0,
                "author_id" INTEGER NOT NULL,
                FOREIGN KEY("author_id") REFERENCES users("id")
);

 INSERT INTO
    "riddles" ( "text", "duration", "level", "hint1", "hint2", "correct_response", "correct_response_at",
                "first_response_at", 'created_at', 'status', 'author_id')
     VALUES ( "What is full name ( Name Surname ) of president of Italy ?",	80, 1, "Man", "Giuseppe", "Giuseppe Conte", NULL, 'Wed, 13 Jul 2022 20:15:03 GMT',
               '09-07-2022 12:42:22', 0, 1),
            ( "What is full name ( Name Surname ) of president of Uzbekistan ?",	120, 1, "Man", "Shovkat", "Shovkat Mirziyoyev",
                'Wed, 13 Jul 2022 20:16:03 GMT', 'Wed, 13 Jul 2022 20:15:03 GMT',
                       '09-07-2022 12:42:55', 0, 1),
            ( "Capital of Uzbekistan ? (all capital)",	40, 1, "First letter T", "Second letter A", "TASHKENT", NULL, NULL,
              '09-07-2022 12:42:55', 1, 1),
            ( "Which camel have three humps ? (all capital)", 65, 1, "Related to body", "Related to female camel", "PREGNANT", 'Wed, 13 Jul 2022 20:15:03 GMT', NULL,
              '09-07-2022 12:42:55', 0, 2),
            ( "Biggest country in the world ? (all capital)", 452, 3, "Located in euroasia", "First letter R", "RUSSIA", NULL, NULL,
              '09-07-2022 12:42:55', 1, 2),
            ( "Smallest country in the world ? ( all capital )", 300, 2, "Location in europe", "Papa lives there", "VATICAN", NULL, 'Wed, 13 Jul 2022 20:15:03 GMT',
                             '09-07-2022 12:42:22', 0, 2),
            ( "What's the name of the river that runs through Egypt ? ( all capital )",	120, 1, "Located in africa", "First letter is N", "NILE", NULL, 'Wed, 13 Jul 2022 20:15:03 GMT',
                     '09-07-2022 12:42:55', 0, 3),
            ( "What's the capital of Spain ? (all capital)", 72, 1, "First letter M", "Located in Europe", "MADRID", NULL, NULL,
            '09-07-2022 12:42:55', 1, 3),
            ( "What is one of the Italian famous circle food in the world ? (all capital)", 100, 1, "First letter P", "One of the Italian city name also called with same name", "PIZZA", NULL, 'Wed, 13 Jul 2022 20:15:03 GMT',
            '09-07-2022 12:42:55', 0, 3),
            ( "How many days are in a leap year ? (in numbers)", 523, 3, "add one day to February", "more than 365", "366", 'Wed, 13 Jul 2022 20:15:03 GMT', NULL,
            '09-07-2022 12:42:55', 0, 4),
            ( "How many colors are there in a rainbow ? (in numbers)", 41, 1, "All main colors included", "More than 5", "7", NULL, NULL,
              '09-07-2022 12:42:22', 1, 4),
            ( "Which animal is known as the `Ship of the Desert` ? ( all capital )", 165, 2, "Looks like to horse", "First letter is C", "CAMEL", 'Wed, 13 Jul 2022 20:15:03 GMT', 'Wed, 13 Jul 2022 20:14:03 GMT',
              '09-07-2022 12:42:55', 0, 4),
            ( "How many letters are there in the English alphabet ? (in numbers)", 182, 2, "More than 20", "Less than 30", "26", 'Wed, 13 Jul 2022 20:14:03 GMT', NULL,
               '09-07-2022 12:42:55', 0, 5),
            ( "How many sides are there in a triangle ? (in numbers)", 34, 1, "Name of shape looks like to answer number", "more than 1", "3", NULL, NULL,
              '09-07-2022 12:42:55', 1, 5),
            ( "Which month of the year has the least number of days ? (all capital)", 50, 1, "First letter is F", "after January", "FEBRUARY", NULL, 'Wed, 13 Jul 2022 20:14:03 GMT',
              '09-07-2022 12:42:55', 0, 5);


CREATE TABLE "answers"(
                   "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT  ,
                   "text" TEXT NOT NULL,
                   "response_at" TEXT NOT NULL,
                   "is_correct" BOOLEAN DEFAULT 0,
                   "author_id" INTEGER NOT NULL,
                   "riddle_id" INTEGER NOT NULL,
                   FOREIGN KEY("author_id") REFERENCES users("id"),
                   FOREIGN KEY("riddle_id") REFERENCES riddles("id")
);

INSERT INTO "answers" ( "text", "response_at", "is_correct", "author_id", "riddle_id" )
 VALUES ('Shovkat Mirziyoyev', 'Wed, 13 Jul 2022 20:16:03 GMT', true, 3, 2),
        ('Alish', 'Wed, 13 Jul 2022 20:15:03 GMT', false, 4, 2),
        ('Kim Chen In', 'Wed, 13 Jul 2022 20:15:03 GMT', false, 4, 1),--
        ('PREGNANT', 'Wed, 13 Jul 2022 20:15:03 GMT', true, 3, 4),
        ('Europa', 'Wed, 13 Jul 2022 20:15:03 GMT', false, 4, 6),
        ('Amazon', 'Wed, 13 Jul 2022 20:15:03 GMT', false, 2, 7),
        ('Perashki', 'Wed, 13 Jul 2022 20:15:03 GMT', false, 1, 9),
        (366, 'Wed, 13 Jul 2022 20:15:03 GMT', true, 2, 10),
        ('CAMEL', 'Wed, 13 Jul 2022 20:15:03 GMT', true, 2, 12),
        ('Zebra', 'Wed, 13 Jul 2022 20:14:03 GMT', false, 3, 12),
        (26, 'Wed, 13 Jul 2022 20:14:03 GMT', true, 1, 13),
        ('December', 'Wed, 13 Jul 2022 20:14:03 GMT', false, 1, 15),
        ('September', 'Wed, 13 Jul 2022 20:14:08 GMT', false, 3, 15);
