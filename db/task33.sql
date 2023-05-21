delete
from change
where task_id = 33;

insert into change (author_id, change_time, field, new_value, old_value, task_id)
VALUES (2, '2022-12-05 10:20:00', 'NONE', '', '', 33),
       (2, '2022-12-05 10:21:00', 'USER', 'Дмитрий Богданов', 'Не назначено', 33),
       (2, '2022-12-05 10:21:01', 'STATUS', 'OPENED', '', 33),
       (2, '2023-01-10 14:09:00', 'FILE_ADD', 'Bank.zip', '', 33),
       (32, '2023-01-10 14:19:00', 'STATUS', 'WORKING', 'OPENED', 33),
       (32, '2023-02-15 14:00:00', 'FILE_ADD', 'xmanbank.zip', '', 33),
       (32, '2023-02-15 14:10:00', 'STATUS', 'TESTING', 'WORKING', 33),
       (2, '2023-02-18 18:20:00', 'STATUS', 'CLOSED', 'TESTING', 33);

delete
from message
where task_id = 33;
insert into message (author_id, local_date_time, task_id, text)
VALUES (2, '2023-01-10 14:09:40', 33, 'Дмитрий приступайте'),
       (32, '2023-02-15 14:08:00', 33, 'Готово. Принимайте')
;
