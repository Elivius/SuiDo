module sui_do::sui_do;

use sui::clock::{Clock};

const STATUS_ACTIVE: u8 = 0; 
const STATUS_COMPLETED: u8 = 1;

const ENotOwner: u64 = 0;
const ETaskNotActive: u64 = 1;
const ETaskNotCompleted: u64 = 2;


public struct Task has key, store {
    id: UID,
    task_name: vector<u8>,
    owner: address,
    status: u8,
    last_update: u64,
}

#[allow(lint(self_transfer))]
public fun create_task(
    task_name: vector<u8>,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    let task = Task {
        id: object::new(ctx),
        task_name,
        owner: ctx.sender(),
        status: STATUS_ACTIVE,
        last_update: clock.timestamp_ms(),
    };

    transfer::public_transfer(task, ctx.sender());
}

public fun edit_task(
    task: &mut Task,
    new_task_name: vector<u8>,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    assert!(task.owner == ctx.sender(), ENotOwner);
    assert!(task.status == STATUS_ACTIVE, ETaskNotActive);

    task.task_name = new_task_name;
    task.last_update = clock.timestamp_ms();
}

public fun delete_task(
    task: Task,
    ctx: &mut TxContext,
) {
    let Task {
        id,
        owner,
        status,
        ..
    } = task;

    assert!(owner == ctx.sender(), ENotOwner);
    assert!(status == STATUS_ACTIVE, ETaskNotActive);

    object::delete(id);
}

public fun complete_task(
    task: &mut Task,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    assert!(task.owner == ctx.sender(), ENotOwner);
    assert!(task.status == STATUS_ACTIVE, ETaskNotActive);

    task.status = STATUS_COMPLETED;
    task.last_update = clock.timestamp_ms();
}

public fun undo_completed_task(
    task: &mut Task,
    clock: &Clock,
    ctx: &mut TxContext,
) {
    assert!(task.owner == ctx.sender(), ENotOwner);
    assert!(task.status == STATUS_COMPLETED, ETaskNotCompleted);

    task.status = STATUS_ACTIVE;
    task.last_update = clock.timestamp_ms();
}

public fun remove_completed_task(
    task: Task,
    ctx: &mut TxContext,
) {
    let Task {
        id,
        owner,
        status,
        ..
    } = task;

    assert!(owner == ctx.sender(), ENotOwner);
    assert!(status == STATUS_COMPLETED, ETaskNotCompleted);

    object::delete(id);
}