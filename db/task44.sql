delete
from change
where task_id = 44;

insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (2, '2023-02-20 10:20:00', 'NONE', '', '', 44),
       (2, '2023-02-20 10:21:00', 'USER', 'Петров', 'Не назначено', 44),
       (2, '2023-02-20 10:21:00', 'DEADLINE', '2023-02-24', '', 44),
       (2, '2023-02-20 10:21:01', 'STATUS', 'OPENED', '', 44),
       (31, '2023-02-20 14:19:00', 'STATUS', 'WORKING', 'OPENED', 44),
       (31, '2023-03-02 10:10:20', 'STATUS', 'TESTING', 'WORKING', 44),
       (2, '2023-03-02 10:20:00', 'STATUS', 'CLOSED', 'TESTING', 44);

delete
from message
where task_id = 44;
insert into message (author_id, local_date_time, task_id, text)
VALUES (2, '2023-02-24 10:10:20', 44, 'Сроки прошли. Необходимо решать задачу'),
       (31, '2023-02-24 10:20:20', 44, 'Где брать информацию о сервисах?'),
       (28, '2023-02-24 10:21:20', 44, 'Информация об есть в документации. Актуальные данные будут позднее'),
       (31, '2023-03-02 10:10:20', 44, 'Готово. Принимайте')
;
