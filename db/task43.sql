delete
from change
where task_id = 43;

insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (2, '2023-02-20 10:20:00', 'NONE', '', '', 43),
       (2, '2023-02-20 10:21:00', 'USER', 'Дмитрий богданов', 'Не назначено', 43),
       (2, '2023-02-20 10:21:01', 'STATUS', 'OPENED', '', 43),
       (32, '2023-02-20 14:19:00', 'STATUS', 'WORKING', 'OPENED', 43),
       (32, '2023-02-28 18:10:20', 'STATUS', 'TESTING', 'WORKING', 43),
       (2, '2023-03-01 08:20:00', 'STATUS', 'CLOSED', 'TESTING', 43);

delete
from message
where task_id = 43;
insert into message (author_id, local_date_time, task_id, text)
VALUES (28, '2023-02-28 18:10:00', 43, 'Готово. Принимайте');
