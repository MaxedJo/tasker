delete
from change
where task_id = 54;

insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (2, '2023-05-07 10:20:00', 'NONE', '', '', 54),
       (2, '2023-05-07 10:21:00', 'USER', 'Петров', 'Не назначено', 54),
       (2, '2023-05-07 10:21:00', 'DEADLINE', '2023-06-29', '', 54),
       (2, '2023-05-07 10:21:01', 'STATUS', 'OPENED', '', 54),
       (31, '2023-05-07 10:23:00', 'STATUS', 'WORKING', 'OPENED', 54),
       (31, '2023-05-21 10:23:00', 'STATUS', 'TESTING', 'WORKING', 54)
;
delete
from message
where task_id = 54;
insert into message (author_id, local_date_time, task_id, text)
VALUES (31, '2023-05-21 10:23:00', 54, 'На этом этапе необходимо произвести совместное с заказчиком тестирование')
;